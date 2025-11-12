"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  gradient: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Оформлюй легко",
    subtitle: "ОТРИМУЙ ШВИДКО",
    buttonText: "Перейти до каталогу",
    image: "🚗",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    title: "Відправка в день замовлення",
    subtitle: "Будь-яким зручним способом доставки",
    buttonText: "Дізнатися більше",
    image: "📦",
    gradient: "from-green-600 to-green-800",
  },
  {
    id: 3,
    title: "Якісні автозапчастини",
    subtitle: "Гарантія якості та оригінальність",
    buttonText: "Переглянути каталог",
    image: "⚙️",
    gradient: "from-orange-600 to-orange-800",
  },
  {
    id: 4,
    title: "Приймаємо з 8:00 до 21:00",
    subtitle: "Зручний графік роботи для вас",
    buttonText: "Зв'язатися з нами",
    image: "⏰",
    gradient: "from-purple-600 to-purple-800",
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
    <section className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full h-full bg-gradient-to-r ${banner.gradient} flex items-center justify-center relative`}
          >
            <div className="container mx-auto px-4 text-center text-white z-10">
              <div className="text-6xl mb-4">{banner.image}</div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-2">
                {banner.title}
              </h2>
              <p className="text-xl lg:text-3xl font-semibold mb-6 text-blue-100">
                {banner.subtitle}
              </p>
              <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                {banner.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Навігаційні стрілки */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all z-20"
        aria-label="Попередній банер"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all z-20"
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
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Перейти до банера ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

