import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Отримуємо токен з заголовка (опціонально)
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    // Формуємо заголовки для запиту
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Додаємо токен, якщо він є
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Виконуємо запит до Unic Tread API
    const response = await fetch(
      "https://order24-api.utr.ua/api/products/popular",
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.message || "Помилка отримання товарів",
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
