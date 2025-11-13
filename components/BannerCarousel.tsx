"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  image: string;
  gradient: string;
}

const banners: Banner[] = [
  {
    id: 1,
    eyebrow: "Не знаєш номер деталі?",
    title: "Ми підберемо за VIN-кодом",
    subtitle: "Гарантовано точний підбір без зайвих витрат",
    description:
      "Передай нам VIN та отримай добірку деталей з актуальними цінами протягом 15 хвилин.",
    buttonText: "Залишити VIN",
    image: "🚗",
    gradient:
      "from-[var(--secondary)] via-[var(--brand-black-soft)] to-[var(--secondary)]",
  },
  {
    id: 2,
    eyebrow: "У наявності понад 20 000 позицій",
    title: "Швидка доставка того ж дня",
    subtitle: "Надішлемо Новою поштою, Meest чи кур'єром",
    description:
      "Оперативно відправляємо замовлення зі складу одразу після підтвердження менеджером.",
    buttonText: "Переглянути каталог",
    image: "📦",
    gradient:
      "from-[var(--brand-black-soft)] via-[var(--secondary)] to-[var(--brand-black-soft)]",
  },
  {
    id: 3,
    eyebrow: "Контроль якості",
    title: "Оригінальні деталі та перевірені аналоги",
    subtitle: "Працюємо лише з офіційними постачальниками",
    description:
      "Надаємо гарантію та підтверджуючі документи на кожне замовлення.",
    buttonText: "Звʼязатися з менеджером",
    image: "⚙️",
    gradient:
      "from-[var(--primary)] via-[var(--brand-yellow-dark)] to-[var(--secondary)]",
  },
  {
    id: 4,
    eyebrow: "Розширений графік",
    title: "Приймаємо заявки щодня до 21:00",
    subtitle: "Завжди на звʼязку у месенджерах",
    description:
      "Підтримка в Telegram, Viber та WhatsApp — відповімо за кілька хвилин.",
    buttonText: "Написати нам",
    image: "💬",
    gradient:
      "from-[var(--brand-yellow-dark)] via-[var(--secondary)] to-[var(--brand-black-soft)]",
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
    <>
      {/* Support strip */}
      {/* <div className="border-b border-(--border)/70 bg-background mb-4">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-(--foreground)/80">
            <span className="font-semibold text-secondary uppercase tracking-wide">
              Підбір деталей за VIN-кодом
            </span>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                "Введіть запит або каталожний номер",
                "Обирайте необхідні деталі",
                "Оформлюйте замовлення за хвилину",
              ].map((text, index) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      {/* Banner carousel */}
      <section className="relative w-full mt-4 mb-8 min-h-[360px] lg:min-h-[440px] py-6 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`w-full h-full bg-[var(--background)] flex items-center justify-center relative`}
            >
              <div className="container mx-auto px-4 lg:px-6 z-10 h-full flex items-center">
                <div
                  className={`w-full rounded-3xl bg-gradient-to-br ${banner.gradient} px-6 py-10 lg:px-16 lg:py-14 text-[var(--primary-foreground)] shadow-2xl flex flex-col lg:flex-row items-center gap-10`}
                >
                  <div className="w-full lg:w-1/2 space-y-4 lg:space-y-5">
                    <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full">
                      <span className="text-lg">{banner.image}</span>
                      {banner.eyebrow}
                    </span>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-base lg:text-lg text-white/80 font-medium">
                      {banner.subtitle}
                    </p>
                    <p className="text-sm lg:text-base text-white/70 max-w-xl">
                      {banner.description}
                    </p>
                    <div className="flex items-center gap-3 pt-4">
                      <button className="bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold px-6 py-3 rounded-full uppercase tracking-wide text-sm hover:bg-[var(--brand-yellow-light)] hover:text-[var(--secondary)] transition-colors shadow-lg">
                        {banner.buttonText}
                      </button>
                      <button
                        onClick={() => goToNext()}
                        className="hidden lg:inline-flex items-center text-sm font-semibold text-[var(--primary-foreground)] hover:text-[var(--brand-yellow-light)] transition-colors"
                      >
                        Дізнатися більше
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 flex items-center justify-center relative">
                    <div className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                      <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-2xl bg-white/15 flex items-center justify-center text-7xl lg:text-8xl">
                        {banner.image}
                      </div>
                      <div className="absolute inset-4 rounded-full border-2 border-white/20"></div>
                      <div className="absolute -bottom-6 bg-white/20 text-white text-xs uppercase tracking-widest px-5 py-2 rounded-full">
                        Kichuk Auto
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Навігаційні стрілки */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--secondary)]/60 hover:bg-[var(--secondary)]/80 text-[var(--secondary-foreground)] p-2 rounded-full transition-all z-20"
          aria-label="Попередній банер"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--secondary)]/60 hover:bg-[var(--secondary)]/80 text-[var(--secondary-foreground)] p-2 rounded-full transition-all z-20"
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
                  ? "bg-[var(--primary)] w-8"
                  : "bg-[var(--primary)]/40 hover:bg-[var(--primary)]/60"
              }`}
              aria-label={`Перейти до банера ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
