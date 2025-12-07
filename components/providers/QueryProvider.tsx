"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Зберігаємо дані в кеші 5 хвилин
            staleTime: 5 * 60 * 1000,
            // Кеш зберігається 10 хвилин
            gcTime: 10 * 60 * 1000,
            // Повторні спроби при помилці
            retry: 1,
            // Рефетч при фокусі вікна
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
