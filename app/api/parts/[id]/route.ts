import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface PartDetail {
  ART_ID: number;
  article_number: string;
  brand: string;
  name: string;
  image_url: string | null;
}

/**
 * Отримання деталі за ID
 * GET /api/parts/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const partId = parseInt(id, 10);

    // Валідація ID
    if (isNaN(partId) || partId <= 0) {
      return NextResponse.json(
        { error: "Невірний ID деталі" },
        { status: 400 }
      );
    }

    // SQL запит для отримання повної картки деталі
    // Використовуємо Prisma.$queryRawUnsafe з параметром для безпеки
    const query = `
      SELECT
          a.ART_ID,
          a.ART_ARTICLE_NR        AS article_number,
          s.SUP_BRAND             AS brand,
          d.DES_TEXT              AS name,
          i.IMG_URL               AS image_url
      FROM ARTICLES a
      JOIN SUPPLIERS s
          ON s.SUP_ID = a.ART_SUP_ID
      JOIN DES_TEXTS d
          ON d.DES_ID = a.ART_DES_ID
      LEFT JOIN ARTICLE_IMAGES ai
          ON ai.ART_ID = a.ART_ID AND ai.IMG_SORT = 1
      LEFT JOIN IMAGES i
          ON i.IMG_ID = ai.IMG_ID
      WHERE a.ART_ID = ${partId};
    `;

    // Виконуємо raw SQL запит через Prisma
    const result = await prisma.$queryRawUnsafe<PartDetail[]>(query);

    // Перевіряємо, чи знайдено деталь
    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "Деталь не знайдена" },
        { status: 404 }
      );
    }

    // Повертаємо перший результат (має бути один, оскільки ART_ID унікальний)
    const part = result[0];

    return NextResponse.json({
      success: true,
      data: {
        id: part.ART_ID,
        articleNumber: part.article_number,
        brand: part.brand,
        name: part.name,
        imageUrl: part.image_url,
      },
    });
  } catch (error) {
    console.error("Error fetching part detail:", error);

    // Обробка помилок підключення до БД
    if (error instanceof Error) {
      if (
        error.message.includes("connect") ||
        error.message.includes("ECONNREFUSED")
      ) {
        return NextResponse.json(
          { error: "Помилка підключення до бази даних" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Помилка сервера при отриманні деталі" },
      { status: 500 }
    );
  }
}
