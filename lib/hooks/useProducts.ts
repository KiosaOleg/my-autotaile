import { useQuery } from "@tanstack/react-query";
import { apiRequest, isAuthenticated } from "@/lib/api";

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  // Додайте інші поля відповідно до API
}

interface ProductsResponse {
  products?: Product[];
  items?: Product[];
  data?: Product[];
}

/**
 * Хук для отримання популярних товарів
 */
export function usePopularProducts() {
  const authenticated = isAuthenticated();

  return useQuery({
    queryKey: ["products", "popular"],
    queryFn: async (): Promise<Product[]> => {
      // Перевіряємо, чи користувач авторизований
      if (!authenticated) {
        throw new Error("Не авторизовано. Будь ласка, увійдіть у систему.");
      }

      const response = await apiRequest("products/popular", {
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Не авторизовано. Будь ласка, увійдіть у систему.");
        }
        const error = await response.json();
        throw new Error(error.error || "Помилка завантаження товарів");
      }

      const data: ProductsResponse = await response.json();

      // Обробка різних форматів відповіді API
      const products = data.products || data.items || data.data || [];

      return products;
    },
    enabled: authenticated, // Запит виконується тільки якщо користувач авторизований
    retry: (failureCount, error) => {
      // Не повторюємо запит при помилці авторизації
      if (error instanceof Error && error.message.includes("Не авторизовано")) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
