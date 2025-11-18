const cards = [
  {
    id: "1",
    title: "Обмін та повернення",
    description:
      'Відповідно до Закону "Про захист прав споживачів" Ви маєте право повернути непотрібний товар або обміняти його на інший протягом 14 днів з моменту оформлення замовлення.',
  },
  {
    id: "2",
    title: "Правила повернення товарів належної якості",
    steps: [
      "Необхідно звернутися до нас у будь-який зручний спосіб: візит до офісу продажу, телефонний дзвінок та ін.",
      "Доставити товар в пункт видачі, або відправити перевізником. Повернення можливе в 14-ти денний термін з моменту замовлення товару. Товар повинен потрапити до нас на склад не пізніше ніж на 12 день після замовлення.",
      "У разі обміну товару належної якості, доставка здійснюється за рахунок отримувача. У разі повернення коштів за товар належної якості, повертається лише вартість товару, без урахування доставки.",
    ],
    note: "Товар належної якості – це товар без дефектів, з цілісною упаковкою, який з певних причин не підійшов Вам.",
  },
  {
    id: "3",
    title:
      "Якщо товар не підійшов з нашої провини, то ми компенсуємо транспортні витрати служб доставки",
  },
  {
    id: "4",
    title: "Увага!",
    steps: [
      "Не відправляти товар без попереднього узгодження.",
      "Товар має бути упакований належним чином. Не допускається нанесення на заводське пакування написів, наліпок і скотча.",
      "Коректне пакування товару є відповідальністю відправника. Порушення вимог може призвести до відмови у поверненні.",
    ],
  },
];

export default function ReturnsPolicyPage() {
  return (
    <main className="min-h-screen bg-background mx-4">
      <section className="container mx-auto px-4 py-10 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">
            Правила обміну та повернення товарів
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Дотримуємося Закону «Про захист прав споживачів». Нижче — умови,
            строки та ключові вимоги для обміну чи повернення.
          </p>
        </header>

        <div className="space-y-6">
          {cards.map((card) => (
            <article
              key={card.id}
              className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-4">
                {/* <span className="text-3xl font-bold text-secondary">
                  {card.id}
                </span> */}
                <h2 className="text-xl font-semibold text-foreground">
                  {card.title}
                </h2>
              </div>

              {card.description && (
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              )}

              {card.note && (
                <p className="text-sm font-semibold text-foreground/80 bg-secondary/10 rounded-2xl px-4 py-2">
                  {card.note}
                </p>
              )}

              {card.steps && (
                <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                  {card.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
