import { prisma } from "@/lib/db";
import Image from "next/image";
import { Package } from "lucide-react";

interface PartDetail {
  supplierId: number;
  article_number: string;
  brand: string | null;
  name: string;
  image_url: string | null;
}

interface FeaturedPartProps {
  supplierId: number;
}

export default async function FeaturedPart({ supplierId }: FeaturedPartProps) {
  if (!process.env.DATABASE_URL) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-yellow-500">DATABASE_URL не налаштований</p>
      </div>
    );
  }

  if (!Number.isInteger(supplierId) || supplierId <= 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Некоректний supplierId</p>
      </div>
    );
  }

  try {
    const result = await prisma.$queryRaw<PartDetail[]>`
      SELECT
        a.supplierId,
        a.DataSupplierArticleNumber AS article_number,
        s.description AS brand,
        COALESCE(a.NormalizedDescription, a.Description) AS name,
        CONCAT('https://cdn.example.com/', ai.PictureName) AS image_url
      FROM articles a
      JOIN suppliers s
        ON s.id = a.supplierId
      LEFT JOIN article_images ai
        ON ai.SupplierId = a.supplierId
        AND ai.DataSupplierArticleNumber = a.DataSupplierArticleNumber
        AND ai.ShowImmediately = TRUE
      WHERE a.supplierId = ${supplierId}
      LIMIT 1;
    `;

    if (!result || result.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Деталь не знайдена</p>
        </div>
      );
    }

    const part = result[0];

    return (
      <section className="container mx-auto px-4 py-12">
        <div className="bg-card border rounded-xl p-6 grid md:grid-cols-2 gap-6">
          {/* Зображення */}
          <div className="flex items-center justify-center bg-muted rounded-lg h-64">
            {part.image_url ? (
              <Image
                src={part.image_url}
                alt={part.name}
                width={400}
                height={400}
                className="object-contain"
              />
            ) : (
              <Package size={64} className="text-muted-foreground" />
            )}
          </div>

          {/* Інформація */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              {part.brand ?? "Невідомий бренд"}
            </h3>

            <div>
              <p className="text-sm text-muted-foreground">Артикул</p>
              <p className="font-semibold">{part.article_number}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Назва</p>
              <p>{part.name}</p>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("FeaturedPart DB error:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Помилка запиту до БД</p>
      </div>
    );
  }
}
