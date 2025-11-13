"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TextBlock() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className=" bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-lg px-6 py-10 lg:px-12 lg:py-14 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between ">
            <div className="space-y-6 text-[var(--foreground)] leading-relaxed">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--secondary)] mb-3">
                  Про компанію
                </span>
                <h1 className="text-xl lg:text-xl font-bold text-[var(--secondary)] mb-4 lg:mb-6 uppercase">
                  KICHUK AUTOPARTS — це більше, ніж просто магазин
                  автозапчастин.
                </h1>
              </div>

              {/* <p className="text-sm lg:text-base text-[var(--foreground)]/80"></p> */}

              <p className="text-sm lg:text-base text-[var(--foreground)]/80">
                Ми — команда, яка живе автомобілями, технологіями та швидкістю.
                Наша місія — зробити сервіс із підбору та купівлі автозапчастин
                максимально зручним, сучасним і прозорим.
              </p>

              <p className="text-sm lg:text-base text-[var(--foreground)]/80">
                Ми працюємо для тих, хто цінує якість і не любить втрачати час.
                KICHUK AUTOPARTS — українська компанія, що постачає оригінальні
                запчастини та якісні аналоги для легкових і вантажних авто. Ми
                співпрацюємо з провідними світовими брендами, щоб ти міг бути
                впевнений у кожній деталі свого авто.
              </p>
              {/* Прихований текст */}
              {isExpanded && (
                <div className="space-y-6">
                  <p className="text-sm lg:text-base text-[var(--foreground)]/80">
                    Чому саме ми - Великий вибір. Тисячі позицій у наявності та
                    під замовлення — від гальмівних колодок до мастил і
                    аксесуарів. <br /> - Професійна підтримка. Наші фахівці
                    допоможуть підібрати потрібну запчастину за VIN-кодом чи
                    моделлю авто. <br /> - Швидка доставка. Відправляємо
                    замовлення по всій Україні — швидко, надійно, без зайвих
                    турбот. <br /> - Справедливі ціни. Ми працюємо напряму з
                    постачальниками, тому ти завжди отримуєш чесну вартість.{" "}
                    <br /> - Гарантія якості. Ми відповідаємо за кожен товар,
                    який продаємо.
                  </p>
                  <p className="text-sm lg:text-base text-[var(--foreground)]/80">
                    Ми знаємо, що авто — це не просто транспорт, а стиль життя.
                    Тому в KICHUK AUTOPARTS ми поєднуємо офіційний підхід до
                    якості з живою енергією сучасного сервісу. Жодної
                    бюрократії, жодних складних процесів — лише чіткий результат
                    і чесне ставлення до клієнта.
                  </p>
                  <p className="text-sm lg:text-base text-[var(--foreground)]/80">
                    Ми знаємо, що авто — це не просто транспорт, а стиль життя.
                    Тому в KICHUK AUTOPARTS ми поєднуємо офіційний підхід до
                    якості з живою енергією сучасного сервісу. Жодної
                    бюрократії, жодних складних процесів — лише чіткий результат
                    і чесне ставлення до клієнта.
                  </p>
                  <p className="text-sm lg:text-base text-[var(--foreground)]/80">
                    Ми розвиваємося щодня, щоб ти міг бути впевнений — твій
                    автомобіль у надійних руках.
                  </p>
                </div>
              )}

              {/* Кнопка "Детальніше" */}
              {!isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--secondary)] text-[var(--secondary)] font-semibold uppercase tracking-wide text-xs hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
                >
                  Детальніше
                  <ChevronDown size={16} />
                </button>
              )}

              {/* Кнопка "Згорнути" (опціонально) */}
              {isExpanded && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--secondary)] text-[var(--secondary)] font-semibold uppercase tracking-wide text-xs hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
                >
                  Згорнути
                  <ChevronDown size={16} className="rotate-180" />
                </button>
              )}

              {/* <div>
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--secondary)] mb-3 uppercase">
                  Як оформити замовлення в Kichuk Auto
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm lg:text-base marker:text-[var(--secondary)]">
                  <li>
                    Введіть назву деталі, каталожний номер або VIN-код
                    автомобіля
                  </li>
                  <li>
                    Оберіть потрібну позицію з каталогу або замовте підбір
                    менеджера
                  </li>
                  <li>Додайте товар до кошика та погодьте умови доставки</li>
                  <li>
                    Оплатіть зручним способом або скористайтеся післяплатою
                  </li>
                  <li>
                    Отримайте деталь у відділенні або курʼєром протягом 1-2 днів
                  </li>
                </ol>
              </div> */}

              <p className="text-sm lg:text-base text-[var(--foreground)]/80">
                Обирайте KICHUK AUTOPARTS — ми працюємо для вашої безпеки на
                дорогах, пропонуючи чесні ціни, гарантію якості та сервіс, на
                який можна покластися щодня.
              </p>
            </div>

            {/* <div className="flex flex-col items-start gap-4">
              <div className="grid grid-cols-1 gap-3 text-sm text-[var(--foreground)]/80">
                <div className="p-4 rounded-2xl border border-[var(--border)]/80 bg-[var(--background)]">
                  <span className="block text-xs font-semibold uppercase text-[var(--secondary)] mb-1">
                    15 хвилин
                  </span>
                  Підбір запчастин за VIN-кодом
                </div>
                <div className="p-4 rounded-2xl border border-[var(--border)]/80 bg-[var(--background)]">
                  <span className="block text-xs font-semibold uppercase text-[var(--secondary)] mb-1">
                    7 днів на тиждень
                  </span>
                  Підтримка у Telegram, Viber та WhatsApp
                </div>
                <div className="p-4 rounded-2xl border border-[var(--border)]/80 bg-[var(--background)]">
                  <span className="block text-xs font-semibold uppercase text-[var(--secondary)] mb-1">
                    20 000+ позицій
                  </span>
                  Постійно поповнюваний склад і попереднє бронювання
                </div>
              </div>

              <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--secondary)] text-[var(--secondary)] font-semibold uppercase tracking-wide text-xs hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors">
                Детальніше
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
