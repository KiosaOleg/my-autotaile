import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface PartRow {
  artId: string;
  supplierId: number;
  articleNumber: string;
  name: string;
  brand: string | null;
  imageUrl: string;
}

export async function GET() {
  try {
    const query = `
      SELECT
        CONCAT(a.supplierId, '_', a.DataSupplierArticleNumber) AS artId,
        a.supplierId,
        a.DataSupplierArticleNumber AS articleNumber,
        COALESCE(a.NormalizedDescription, a.Description) AS name,
        s.description AS brand,
        COALESCE(
          CONCAT('https://image.auto-db.pro/images/', ai.PictureName),
          'https://via.placeholder.com/200'
        ) AS imageUrl
      FROM articles a
      JOIN suppliers s
        ON s.id = a.supplierId
      JOIN article_images ai
        ON ai.SupplierId = a.supplierId
        AND ai.DataSupplierArticleNumber = a.DataSupplierArticleNumber
        AND ai.ShowImmediately = TRUE
      LIMIT 5;
    `;

    const result = await prisma.$queryRawUnsafe<PartRow[]>(query);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "Деталі з зображенням не знайдені" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching parts with images:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
