"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  image: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image: "/baner-01.jpg",
  },
  {
    id: 2,
    image: "/baner-02.jpg",
  },
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Автоматична зміна кожні 5 секунд

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative w-full min-h-[360px] lg:min-h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={banner.image}
              alt={`Banner ${banner.id}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Навігаційні стрілки */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/60 hover:bg-secondary/80 text-secondary-foreground p-2 rounded-full transition-all z-20"
        aria-label="Попередній банер"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/60 hover:bg-secondary/80 text-secondary-foreground p-2 rounded-full transition-all z-20"
        aria-label="Наступний банер"
      >
        <ChevronRight size={24} />
      </button>

      {/* Індикатори */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-primary/40 hover:bg-primary/60"
            }`}
            aria-label={`Перейти до банера ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
