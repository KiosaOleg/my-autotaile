import { prisma } from "@/lib/db";
import Image from "next/image";
import { Package } from "lucide-react";

interface PartDetail {
  ART_ID: number;
  article_number: string;
  brand: string;
  name: string;
  image_url: string | null;
}

interface FeaturedPartProps {
  partId: number;
}

/**
 * Компонент для відображення деталі з бази даних
 * Server Component - виконує запит до БД на сервері
 */
export default async function FeaturedPart({ partId }: FeaturedPartProps) {
  // Перевірка наявності DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-6 text-center">
          <p className="text-yellow-500 font-medium">
            DATABASE_URL не налаштований. Перевірте Environment Variables в
            Vercel.
          </p>
        </div>
      </div>
    );
  }

  try {
    // Валідація partId для безпеки
    if (isNaN(partId) || partId <= 0) {
      throw new Error(`Invalid partId: ${partId}`);
    }

    // SQL запит для отримання повної картки деталі
    // Використовуємо Prisma.$queryRaw з параметрами для безпеки
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
      WHERE a.ART_ID = ?;
    `;

    // Виконуємо raw SQL запит через Prisma з параметром для безпеки
    const result = (await prisma.$queryRawUnsafe(
      query.replace("?", partId.toString())
    )) as PartDetail[];

    // Перевіряємо, чи знайдено деталь
    if (!result || result.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <p className="text-muted-foreground">
              Деталь з ID {partId} не знайдена
            </p>
          </div>
        </div>
      );
    }

    const part = result[0];

    return (
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-8 uppercase">
            Рекомендована деталь
          </h2>

          <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Зображення */}
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-muted border border-border">
                {part.image_url ? (
                  <Image
                    src={part.image_url}
                    alt={part.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={64} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Інформація */}
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Деталь #{part.ART_ID}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground">
                        {part.brand}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                      Артикул
                    </label>
                    <p className="text-lg font-semibold text-foreground">
                      {part.article_number}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                      Назва
                    </label>
                    <p className="text-lg text-foreground">{part.name}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <button className="w-full bg-secondary hover:bg-(--brand-black-soft) text-secondary-foreground font-semibold py-4 rounded-full shadow-lg transition-all uppercase tracking-wide">
                    Додати до кошика
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    // Детальне логування помилки
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorCode =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : "UNKNOWN";

    console.error("Error fetching featured part:", {
      error: errorMessage,
      code: errorCode,
      partId,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPreview: process.env.DATABASE_URL
        ? `${process.env.DATABASE_URL.substring(0, 30)}...`
        : "not set",
    });

    // Визначаємо тип помилки для кращого повідомлення
    let userMessage = "Помилка завантаження деталі.";
    let details = "";

    if (errorMessage.includes("Authentication failed")) {
      userMessage = "Помилка автентифікації з базою даних.";
      details =
        "Перевірте правильність DATABASE_URL в Vercel Environment Variables.";
    } else if (
      errorMessage.includes("connect") ||
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("ETIMEDOUT")
    ) {
      userMessage = "Неможливо підключитися до бази даних.";
      details =
        "Перевірте, чи IP-адреси Vercel дозволені в налаштуваннях MySQL.";
    } else if (errorMessage.includes("DATABASE_URL")) {
      userMessage = "DATABASE_URL не налаштований.";
      details =
        "Додайте DATABASE_URL в Vercel Dashboard → Settings → Environment Variables.";
    } else {
      details = `Код помилки: ${errorCode}`;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6">
          <p className="text-red-500 font-medium mb-2">{userMessage}</p>
          {details && <p className="text-red-500/80 text-sm">{details}</p>}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4">
              <summary className="cursor-pointer text-xs text-red-500/60">
                Деталі помилки (тільки в development)
              </summary>
              <pre className="mt-2 p-2 bg-red-500/5 rounded text-xs overflow-auto">
                {errorMessage}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
