import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refresh_token, browser_fingerprint } = body;

    if (!refresh_token || !browser_fingerprint) {
      return NextResponse.json(
        { error: "refresh_token та browser_fingerprint обов'язкові" },
        { status: 400 }
      );
    }

    // Виконуємо запит до Unic Tread API для оновлення токена
    const response = await fetch("https://order24-api.utr.ua/api/token/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token,
        browser_fingerprint,
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

      // 401 - некоректний refresh_token
      if (response.status === 401) {
        return NextResponse.json(
          { 
            error: errorData.message?.message || errorData.message || "Некоректний refresh token. Будь ласка, увійдіть знову.",
            code: 401
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { 
          error: errorData.message?.message || errorData.message || errorData.error || "Помилка оновлення токена",
          code: response.status
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Повертаємо нові токени (зберігаємо browser_fingerprint для подальших запитів)
    return NextResponse.json({
      token: data.token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      browser_fingerprint: browser_fingerprint, // Зберігаємо той самий fingerprint
      success: true,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}
