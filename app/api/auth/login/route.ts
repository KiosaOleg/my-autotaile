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

    // Генеруємо browser_fingerprint (можна використати MD5 або просто унікальний рядок)
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

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Помилка авторизації" },
        { status: response.status }
      );
    }

    // Повертаємо токен клієнту
    return NextResponse.json({
      token: data.token,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
