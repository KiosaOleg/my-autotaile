// app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background mx-4">
      {/* Верхній блок: текст + картинка */}
      <section className="container mx-auto px-4 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          {/* Текст про компанію */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Про компанію
            </h1>
            <p className="text-sm lg:text-base text-[var(--foreground)]/80">
              Компанія <strong>“Kichuk Autoparts”</strong> — це більше, ніж
              просто магазин автозапчастин.
            </p>
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
            <p className="text-sm lg:text-base text-[var(--foreground)]/80">
              Чому саме ми - Великий вибір. Тисячі позицій у наявності та під
              замовлення — від гальмівних колодок до мастил і аксесуарів. <br />{" "}
              - Професійна підтримка. Наші фахівці допоможуть підібрати потрібну
              запчастину за VIN-кодом чи моделлю авто. <br /> - Швидка доставка.
              Відправляємо замовлення по всій Україні — швидко, надійно, без
              зайвих турбот. <br /> - Справедливі ціни. Ми працюємо напряму з
              постачальниками, тому ти завжди отримуєш чесну вартість. <br /> -
              Гарантія якості. Ми відповідаємо за кожен товар, який продаємо.
            </p>
            <p className="text-sm lg:text-base text-[var(--foreground)]/80">
              Ми знаємо, що авто — це не просто транспорт, а стиль життя. Тому в
              KICHUK AUTOPARTS ми поєднуємо офіційний підхід до якості з живою
              енергією сучасного сервісу. Жодної бюрократії, жодних складних
              процесів — лише чіткий результат і чесне ставлення до клієнта.
            </p>
            <p className="text-sm lg:text-base text-[var(--foreground)]/80">
              Ми знаємо, що авто — це не просто транспорт, а стиль життя. Тому в
              KICHUK AUTOPARTS ми поєднуємо офіційний підхід до якості з живою
              енергією сучасного сервісу. Жодної бюрократії, жодних складних
              процесів — лише чіткий результат і чесне ставлення до клієнта.
            </p>
            <p className="text-sm lg:text-base text-[var(--foreground)]/80">
              Ми розвиваємося щодня, щоб ти міг бути впевнений — твій автомобіль
              у надійних руках.
            </p>
          </div>

          {/* Зображення авто / банера */}
          <div className="w-full h-[220px] sm:h-[260px] lg:h-[320px] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/logo.jpg" // заміни на окремий банер, наприклад /about-car.jpg
              alt="Kichuk Autoparts"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Нижній блок: контактна інформація + карта */}
      <section className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] items-start">
            {/* Контактна карточка */}
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Наша адреса
              </h2>
              <p className="text-sm text-muted-foreground">
                м. Одеса, Проспект Небесної Сотні 2А, ринок Успіх, магазин 214
              </p>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Графік роботи:</p>
                <p>Пн–Пт: 10:00 – 17:00</p>
                <p>Сб-Нд: 10:00 – 16:00</p>
                {/* <p>Нд: вихідний</p> */}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Обробка заявок:</p>
                <p>Пн–Нд: 10:00 – 21:00</p>
                {/* <p>Сб-Нд: 9:00 – 16:00</p> */}
                {/* <p>Нд: вихідний</p> */}
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Телефони:</p>
                <a
                  href="tel:+380983928740"
                  className="block hover:text-secondary"
                >
                  38 (098) 392-87-40
                </a>
                {/* <a
                  href="tel:+380688363751"
                  className="block hover:text-secondary"
                >
                  38 (068) 836-37-51
                </a> */}
              </div>
            </div>

            {/* Карта (Google Maps iframe) */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[260px] sm:h-[320px] lg:h-[360px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d771.8434568113316!2d30.71428555155205!3d46.418226889399136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDbCsDI1JzA1LjciTiAzMMKwNDInNTEuNiJF!5e0!3m2!1suk!2sbg!4v1763375206820!5m2!1suk!2sbg"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
