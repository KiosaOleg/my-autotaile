import { NextResponse } from "next/server";

interface PartRow {
  artId: string;
  supplierId: number;
  articleNumber: string;
  name: string;
  brand: string | null;
  imageUrl: string;
}

export async function GET() {
  // Тимчасово повертаємо прикладові дані для тестування
  const sampleParts: PartRow[] = [
    {
      artId: "1_OE123456",
      supplierId: 1,
      articleNumber: "OE123456",
      name: "Масляний фільтр MANN",
      brand: "MANN-FILTER",
      imageUrl: "https://via.placeholder.com/200"
    },
    {
      artId: "2_BP456789",
      supplierId: 2,
      articleNumber: "BP456789",
      name: "Тормозні колодки BOSCH",
      brand: "BOSCH",
      imageUrl: "https://via.placeholder.com/200"
    }
  ];

  return NextResponse.json({
    success: true,
    data: sampleParts,
    message: "Прикладові дані деталей (без підключення до БД)"
  });
}
