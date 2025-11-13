"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#3a3a3a] via-[#2d2d2d] to-[#3a3a3a] text-[var(--brand-yellow-light)] border-t border-[#4a4a4a]/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* Колонка 1: Інформація */}
          <div>
            <h3 className="text-lg font-bold text-[var(--brand-yellow-light)]  uppercase  inline-block mb-1">
              Інформація
            </h3>
            <div className="flex justify-between gap-8  border-t-2 border-[#f4c430] pt-3">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Про компанію
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Контакти
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Акції
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Допомога (FAQ)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Кешбек і сертифікати
                  </a>
                </li>
              </ul>
              <ul className="space-y-2 ">
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Доставка і оплата
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Умови повернення та обміну
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Гарантія
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--brand-yellow-light)]/80 hover:text-[var(--brand-yellow-light)] transition-colors"
                  >
                    Договір публічної оферти
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="bg-primary px-3 py-1 rounded text-primary-foreground hover:bg-[var(--brand-yellow-light)] hover:text-secondary transition-colors inline-block"
                  >
                    Політика конфіденційності
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Колонка 2: Графік роботи та умови */}
          <div>
            <h3 className="text-lg font-bold text-[var(--brand-yellow-light)] mb-4 uppercase border-b-2 border-[#f4c430] inline-block pb-1">
              Графік роботи
            </h3>

            <div>
              <div className="mt-4 ml-8 space-y-2  text-sm text-[var(--brand-yellow-light)]/80">
                <p>
                  <span className="text-[var(--brand-yellow-light)] font-semibold">
                    Пн-Пт:
                  </span>{" "}
                  8:00 - 21:00
                </p>
                <p>
                  <span className="text-[var(--brand-yellow-light)] font-semibold">
                    Сб-Нд:
                  </span>{" "}
                  8:00 - 21:00
                </p>
              </div>
              <div className="flex items-start mt-4 gap-3">
                <MapPin
                  size={20}
                  className="text-[var(--brand-yellow-light)] mt-1 flex-shrink-0"
                />
                <div className="text-sm">
                  <p>м. Одеса, 65121</p>
                  <p>Проспект Небесної Сотні 75/2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Колонка 3: Контакти та соцмережі */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <Image
                  src="/logo.jpg"
                  alt="Kichuk Auto logo"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-[var(--brand-yellow-light)]">
                KICHUK AUTOPARTS
              </span>
            </div>

            <div className="space-y-3 text-[var(--brand-yellow-light)]/80">
              <a
                href="tel:+380730000058"
                className="flex items-center gap-3 hover:text-[var(--brand-yellow-light)] transition-colors"
              >
                <Phone size={18} className="text-[var(--brand-yellow-light)]" />
                <span>+38 073 000-00-58</span>
              </a>
              <a
                href="tel:+380680805858"
                className="flex items-center gap-3 hover:text-[var(--brand-yellow-light)] transition-colors"
              >
                <Phone size={18} className="text-[var(--brand-yellow-light)]" />
                <span>+38 068 080-58-58</span>
              </a>

              <div className="flex gap-3">
                <a
                  href="tel:+380730000058"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-[var(--brand-yellow-light)] hover:text-secondary transition-colors"
                  aria-label="Telegram"
                >
                  <Send size={18} className="text-primary-foreground" />
                </a>
                <a
                  href="tel:+380730000058"
                  className="w-10 h-10 bg-[var(--brand-yellow-light)] rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                  aria-label="Viber"
                >
                  <MessageCircle size={18} className="text-secondary" />
                </a>
                <a
                  href="tel:+380730000058"
                  className="w-10 h-10 bg-[var(--brand-yellow-light)] rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} className="text-secondary" />
                </a>
              </div>

              <a
                href="mailto:support@kichukauto.com.ua"
                className="flex items-center gap-3 hover:text-[var(--brand-yellow-light)] transition-colors"
              >
                <Mail size={18} className="text-[var(--brand-yellow-light)]" />
                <span>support@kichukauto.com.ua</span>
              </a>
            </div>
          </div>
        </div>

        {/* Нижня частина футера */}
        <div className="border-t border-[#4a4a4a]/50 mt-8 pt-6 text-center text-sm text-[var(--brand-yellow-light)]/60">
          <p>© 2024 Kichuk Auto. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
