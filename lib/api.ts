/**
 * Утиліта для виконання автентифікованих запитів до Unic Tread API
 */

interface AuthData {
  token: string;
  refresh_token: string;
  expires_at: string;
  browser_fingerprint: string;
  user_email?: string;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

export function getBrowserFingerprint(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("browser_fingerprint");
}

export function getExpiresAt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("expires_at");
}

export function setAuthData(data: AuthData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("expires_at", data.expires_at);
  localStorage.setItem("browser_fingerprint", data.browser_fingerprint);
  if (data.user_email) {
    localStorage.setItem("user_email", data.user_email);
  }
}

export function removeAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("browser_fingerprint");
  localStorage.removeItem("user_email");
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

/**
 * Перевіряє, чи токен прострочений
 */
export function isTokenExpired(): boolean {
  const expiresAt = getExpiresAt();
  if (!expiresAt) return true;

  const expiryDate = new Date(expiresAt);
  const now = new Date();
  // Перевіряємо за 5 хвилин до закінчення
  return expiryDate.getTime() - now.getTime() < 5 * 60 * 1000;
}

/**
 * Оновлює токен використовуючи refresh_token
 */
export async function refreshAuthToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  const browserFingerprint = getBrowserFingerprint();

  if (!refreshToken || !browserFingerprint) {
    return false;
  }

  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
        browser_fingerprint: browserFingerprint,
      }),
    });

    if (!response.ok) {
      // Якщо refresh не вдався, видаляємо всі токени
      removeAuthToken();
      return false;
    }

    const data = await response.json();

    if (data.token && data.refresh_token) {
      setAuthData({
        token: data.token,
        refresh_token: data.refresh_token,
        expires_at: data.expires_at,
        browser_fingerprint: data.browser_fingerprint || browserFingerprint, // Використовуємо з відповіді або зберігаємо старий
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error("Refresh token error:", error);
    removeAuthToken();
    return false;
  }
}

/**
 * Отримує актуальний токен, автоматично оновлюючи його якщо потрібно
 */
export async function getValidToken(): Promise<string | null> {
  if (!isAuthenticated()) {
    return null;
  }

  // Якщо токен прострочений або скоро прострочиться, оновлюємо його
  if (isTokenExpired()) {
    const refreshed = await refreshAuthToken();
    if (!refreshed) {
      return null;
    }
  }

  return getAuthToken();
}

/**
 * Виконує автентифікований запит до Unic Tread API
 */
export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getValidToken();

  if (!token) {
    throw new Error("Не авторизовано. Будь ласка, увійдіть у систему.");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  let response = await fetch(`https://order24-api.utr.ua/api/${endpoint}`, {
    ...options,
    headers,
  });

  // Якщо токен прострочений, спробуємо оновити і повторити запит
  if (response.status === 401) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.message === "Expired JWT Token") {
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        const newToken = getAuthToken();
        if (newToken) {
          headers.set("Authorization", `Bearer ${newToken}`);
          response = await fetch(`https://order24-api.utr.ua/api/${endpoint}`, {
            ...options,
            headers,
          });
        }
      }
    }
  }

  return response;
}

/**
 * Виконує автентифікований запит через Next.js API route
 * (для безпеки - токен не передається на клієнт)
 */
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getValidToken();

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(`/api/${endpoint}`, {
    ...options,
    headers,
  });

  // Якщо отримали 401, спробуємо оновити токен і повторити
  if (response.status === 401) {
    const errorData = await response.json().catch(() => ({}));
    if (
      errorData.message?.includes("Expired") ||
      errorData.message?.includes("Invalid")
    ) {
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        const newToken = getAuthToken();
        if (newToken) {
          headers.set("Authorization", `Bearer ${newToken}`);
          response = await fetch(`/api/${endpoint}`, {
            ...options,
            headers,
          });
        }
      }
    }
  }

  return response;
}
