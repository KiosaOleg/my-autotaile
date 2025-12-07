import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email та пароль обов'язкові" },
        { status: 400 }
      );
    }

    // Генеруємо browser_fingerprint (зберігаємо для подальшого використання)
    const browserFingerprint = `web-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;

    // Виконуємо запит до Unic Tread API
    const response = await fetch("https://order24-api.utr.ua/api/login_check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        browser_fingerprint: browserFingerprint,
      }),
    });

    // Обробка помилок згідно з документацією
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "Помилка сервера" };
      }

      // 412 - некоректні дані користувача
      if (response.status === 412) {
        return NextResponse.json(
          {
            error:
              errorData.message ||
              "Некоректні дані користувача. Перевірте коректність введених даних і спробуйте ще раз.",
            code: 412,
          },
          { status: 412 }
        );
      }

      // 401 - інші помилки авторизації
      return NextResponse.json(
        {
          error: errorData.message || errorData.error || "Помилка авторизації",
          code: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Повертаємо всі дані з API
    return NextResponse.json({
      token: data.token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      browser_fingerprint: browserFingerprint, // Зберігаємо для refresh
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
