const sections = [
  {
    title: "Гарантія на запчастини",
    content: [
      "Термін рахується з моменту купівлі, згідно з гарантійною таблицею Мінінфраструктури (наказ №615 від 28.11.2014).",
      "При самостійному встановленні — 14 днів.",
    ],
  },
  {
    title: "Товар, який можна повернути",
    content: [
      "Без механічних пошкоджень, повністю укомплектований.",
      "З пломбами, заводськими маркуваннями, товарним виглядом і без ознак використання.",
    ],
  },
  {
    title: "Не підлягає поверненню",
    content: [
      "Товар, що був у використанні.",
      "Пошкоджена упаковка або відсутня комплектація.",
    ],
  },
  {
    title: "Як повернути кошти",
    content: [
      "Спосіб залежить від методів оплати: реквізити/картка/готівка.",
      "Переказ — протягом 1‑2 робочих днів після отримання поверненого товару.",
    ],
  },
];

const exchangeSteps = [
  {
    title: "Товари належної якості",
    text: [
      "Можна обміняти або повернути кошти протягом 14 днів.",
      "Обмін робиться за 7 днів за умови наявності аналога; інакше — повернення коштів.",
      "Доставка при обміні/поверненні — за рахунок отримувача.",
    ],
  },
  {
    title: "Товари неналежної якості",
    text: [
      "Повернення/обмін також протягом 14 днів.",
      "Обмін протягом 7 днів; за відсутності аналога — повернення або очікування поставки.",
      "Повертаємо лише вартість товару без доставки.",
    ],
  },
];

const requiredDocs = [
  "Чек, заява на повернення, гарантійний талон.",
  "Документ, що посвідчує особу.",
  "Інструкції/квитанції/бірки мають бути в комплекті.",
  "Повернення проводиться лише після висновку сервісного центру або виробника про відсутність порушень експлуатації.",
];

const contactInfo = [
  "Звертайтесь у call-центр та погодьте обмін/повернення.",
  "Відправка «Нова пошта»: Одеса, Склад 101, Райдугний масив 23 (одержувач ФОП).",
  "«Укрпошта»: відділення 65125, Одеса, Райдугний масив, 9В (одержувач ФОП).",
  "«Meest Post»: відділення 17462, Одеса, Інглезі 8Б (одержувач ФОП).",
  "Після відправки повідомте менеджеру номер ТТН і банківські реквізити.",
];

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-background mx-4">
      <section className="container mx-auto px-4 py-10 space-y-10">
        <header className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Гарантія та повернення
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            Правила гарантійного обслуговування, обміну та повернення товарів
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Дотримуємося Закону «Про захист прав споживачів». Нижче — умови,
            строки, необхідні документи й контакти.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm space-y-3"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                {section.content.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {exchangeSteps.map((block) => (
            <div
              key={block.title}
              className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm space-y-3"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {block.title}
              </h2>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                {block.text.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Необхідні умови стану товару
          </h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
            {requiredDocs.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Повернення коштів
          </h2>
          <p className="text-sm text-muted-foreground">
            Повернення вартості здійснюється після виконання всіх умов та
            перевірки товару, але не пізніше 10 днів з моменту отримання і
            письмової заяви.
          </p>
          <h3 className="text-base font-semibold text-foreground">Контакти</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
            {contactInfo.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
