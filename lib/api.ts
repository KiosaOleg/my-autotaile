/**
 * Утиліта для виконання автентифікованих запитів до Unic Tread API
 */

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", token);
}

export function removeAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_email");
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

/**
 * Виконує автентифікований запит до Unic Tread API
 */
export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Не авторизовано. Будь ласка, увійдіть у систему.");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  return fetch(`https://order24-api.utr.ua/api/${endpoint}`, {
    ...options,
    headers,
  });
}
