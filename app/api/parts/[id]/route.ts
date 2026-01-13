import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface PartRow {
  supplier_id: number;
  article_number: string;
  name: string;
  brand: string | null;
}

export async function GET() {
  try {
    const query = `
      SELECT
        a.supplierId                AS supplier_id,
        a.DataSupplierArticleNumber AS article_number,
        a.Description               AS name,
        s.description               AS brand
      FROM articles a
      JOIN suppliers s
        ON s.id = a.supplierId
      ORDER BY a.supplierId ASC
      LIMIT 1;
    `;

    const result = await prisma.$queryRawUnsafe<PartRow[]>(query);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Деталь не знайдена" },
        { status: 404 }
      );
    }

    const part = result[0];

    return NextResponse.json({
      success: true,
      data: {
        supplierId: part.supplier_id,
        articleNumber: part.article_number,
        name: part.name,
        brand: part.brand,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
