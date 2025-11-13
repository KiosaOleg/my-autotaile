"use client";

import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  currency: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    brand: "BOSCH",
    name: "Комплект гальмівних колодок BOSCH 0986495153",
    price: 1560,
    currency: "₴",
    image: "🔧",
  },
  {
    id: 2,
    brand: "VALEO",
    name: "Щітка склоочисника VALEO 574282",
    price: 370,
    currency: "₴",
    image: "🧹",
  },
  {
    id: 3,
    brand: "JC PREMIUM",
    name: "Повітряний фільтр JC PREMIUM B22103PR",
    price: 290,
    currency: "₴",
    image: "🌬️",
  },
  {
    id: 4,
    brand: "BOSCH",
    name: "Повітряний фільтр BOSCH 1987429187",
    price: 355,
    currency: "€",
    image: "🌬️",
  },
  {
    id: 5,
    brand: "BOSCH",
    name: "Повітряний фільтр BOSCH 1987429188",
    price: 465,
    currency: "₴",
    image: "🌬️",
  },
  {
    id: 6,
    brand: "MANN",
    name: "Масляний фільтр MANN W712/73",
    price: 280,
    currency: "₴",
    image: "🛢️",
  },
  {
    id: 7,
    brand: "NGK",
    name: "Свічка запалювання NGK BKR6E",
    price: 95,
    currency: "₴",
    image: "⚡",
  },
  {
    id: 8,
    brand: "FERODO",
    name: "Комплект гальмівних колодок FERODO FDB1635",
    price: 1240,
    currency: "₴",
    image: "🔧",
  },
  {
    id: 9,
    brand: "MAHLE",
    name: "Паливний фільтр MAHLE KL83",
    price: 420,
    currency: "₴",
    image: "⛽",
  },
  {
    id: 10,
    brand: "DENSO",
    name: "Свічка запалювання DENSO IK20",
    price: 180,
    currency: "₴",
    image: "⚡",
  },
];

export default function PopularProducts() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] mb-8 uppercase">
          Популярні товари
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[var(--card)] rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 relative border border-[var(--border)]"
            >
              {/* Кнопка улюблених */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 p-2 hover:bg-[var(--muted)] rounded-full transition-colors"
                aria-label="Додати до улюблених"
              >
                <Star
                  size={18}
                  className={
                    favorites.includes(product.id)
                      ? "fill-[var(--primary)] text-[var(--primary)]"
                      : "text-[var(--border)]"
                  }
                />
              </button>

              {/* Зображення товару */}
              <div className="w-full h-48 bg-[var(--muted)]/60 rounded-lg flex items-center justify-center mb-4">
                <span className="text-6xl text-[var(--secondary)]">
                  {product.image}
                </span>
              </div>

              {/* Бренд */}
              <div className="mb-2">
                <span className="text-lg font-bold text-[var(--secondary)] uppercase">
                  {product.brand}
                </span>
              </div>

              {/* Назва товару */}
              <p className="text-sm text-[var(--foreground)]/70 mb-4 line-clamp-2">
                {product.name}
              </p>

              {/* Ціна та кнопка */}
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-[var(--secondary)]">
                  {product.price} {product.currency}
                </div>
                <button className="bg-[var(--primary)] hover:bg-[var(--brand-yellow-light)] text-[var(--primary-foreground)] px-4 py-2 rounded-full transition-colors shadow-md font-semibold uppercase text-xs tracking-wide">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
