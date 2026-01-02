import { PrismaClient } from "@prisma/client";

// Глобальна змінна для Prisma Client (для Next.js)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Створюємо Prisma Client тільки один раз
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// У development режимі зберігаємо в global, щоб уникнути створення багатьох інстансів
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
