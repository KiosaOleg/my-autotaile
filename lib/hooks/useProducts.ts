import { useQuery } from "@tanstack/react-query";

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
  return useQuery({
    queryKey: ["products", "popular"],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch("/api/products/popular", {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Помилка завантаження товарів");
      }

      const data: ProductsResponse = await response.json();

      // Обробка різних форматів відповіді API
      const products = data.products || data.items || data.data || [];

      return products;
    },
    retry: (failureCount) => {
      return failureCount < 2;
    },
  });
}
