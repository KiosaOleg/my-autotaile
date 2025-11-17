import PartsRequestButton from "@/components/PartsRequestButton";

const deliveryCards = [
  {
    title: "Доставка по Україні",
    items: [
      "Транспортні компанії: «Нова пошта», «Meest Post», «Укрпошта».",
      "Вартість — за тарифами служб. Актуальні тарифи: Нова пошта, Meest Post, Укрпошта.",
      "Відправлення йде на склад транспортної компанії вашого міста.",
    ],
  },
  {
    title: "Терміни відправки",
    items: [
      "Замовлення до 14:00 готуються та відправляються в день оформлення.",
      "Після 14:00 — наступного дня.",
      "Повернене з вини клієнта замовлення пересилається повторно за рахунок клієнта.",
    ],
  },
  {
    title: "Що вказати під час оформлення",
    items: [
      "ПІБ одержувача та контактний телефон.",
      "Найменування відділення/адреси для доставки.",
      "Номер складу транспортної компанії у вашому місті.",
    ],
  },
];

const odessaCards = [
  {
    title: "Адресна доставка м. Одеса",
    details: [
      "Кур'єрська служба, щодня 09:00–20:00.",
      "Ціна залежить від вартості товару та габаритів, стартує від 99 грн.",
    ],
  },
  {
    title: "Кур'єр на СТО",
    details: [
      "Доставка безпосередньо на СТО (поки лише в Одесі).",
      "Необхідно вказати адресу СТО та контактну особу.",
      "Попередня оплата або присутність співробітника СТО — за потребою.",
    ],
  },
  {
    title: "Зверніть увагу",
    details: [
      "Кур'єр доставляє замовлення до під'їзду/входу, якщо це не суперечить правилам руху.",
    ],
  },
];

const paymentBlocks = [
  {
    title: "Накладений платіж",
    bullets: [
      "Оплата при отриманні на складі перевізника.",
      "Комісія служби + 20 грн (≈2% суми).",
    ],
  },
  {
    title: "Безготівковий розрахунок",
    bullets: [
      "Онлайн Visa/MasterCard або інтернет-банкінг.",
      "На розрахунковий рахунок через термінал/банкінг.",
      "Оплата по інвойсу LIQPAY (після погодження). Комісія банку оплачується окремо.",
    ],
  },
  {
    title: "Готівкою",
    bullets: ["Оплата в касі магазину при самовивозі або доставці по Одесі."],
  },
];

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-background mx-4">
      <section className="container mx-auto px-4 py-10 space-y-10">
        <header className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Доставка й оплата
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            Умови відправки по Україні та кур'єрська доставка в Одесі
          </h1>
          <p className="text-base text-muted-foreground">
            Виберіть зручний спосіб отримання замовлення та перевагу для оплати.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {deliveryCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm space-y-4"
            >
              <h2 className="text-lg font-semibold text-foreground">
                {card.title}
              </h2>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                {card.items.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card/80 p-6 space-y-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Адресна доставка по Одесі
            </h2>
            <div className="space-y-4">
              {odessaCards.map((block) => (
                <div key={block.title} className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {block.title}
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
                    {block.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card/80 p-6 space-y-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Оплата</h2>
            <div className="space-y-4">
              {paymentBlocks.map((block) => (
                <div key={block.title} className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {block.title}
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
                    {block.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PartsRequestButton />
      </section>
    </main>
  );
}
