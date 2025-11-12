"use client";

import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Колонка 1: Інформація */}
          <div>
            <h3 className="text-lg font-bold text-blue-300 mb-4 uppercase">
              Інформація
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Про компанію
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Контакти
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Акції
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Допомога (FAQ)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Кешбек і сертифікати
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 2: Графік роботи та умови */}
          <div>
            <h3 className="text-lg font-bold text-blue-300 mb-4 uppercase">
              Графік роботи
            </h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Доставка і оплата
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Умови повернення та обміну
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Гарантія
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-300 transition-colors"
                >
                  Договір публічної оферти
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-blue-700 px-3 py-1 rounded text-white hover:bg-blue-600 transition-colors inline-block"
                >
                  Політика конфіденційності
                </a>
              </li>
            </ul>

            <div className="border-t border-blue-700 pt-4">
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-blue-300">Пн-Пт:</span> 8:00 - 21:00
                </p>
                <p>
                  <span className="text-blue-300">Сб-Нд:</span> 8:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Колонка 3: Контакти та соцмережі */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">A</span>
                </div>
                <span className="text-2xl font-bold">AUTOPRO</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-300 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>м. Одеса, 65121</p>
                  <p>Проспект Небесної Сотні 75/2</p>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href="tel:+380730000058"
                  className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
                >
                  <Phone size={18} className="text-blue-300" />
                  <span>+38 073 000-00-58</span>
                </a>
                <a
                  href="tel:+380680805858"
                  className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
                >
                  <Phone size={18} className="text-blue-300" />
                  <span>+38 068 080-58-58</span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="tel:+380730000058"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="Telegram"
                >
                  <Send size={18} />
                </a>
                <a
                  href="tel:+380730000058"
                  className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  aria-label="Viber"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="tel:+380730000058"
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>

              <a
                href="mailto:support@autopro.com.ua"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <Mail size={18} className="text-blue-300" />
                <span>support@autopro.com.ua</span>
              </a>
            </div>
          </div>
        </div>

        {/* Нижня частина футера */}
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm text-blue-300">
          <p>© 2024 AUTOPRO. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}

