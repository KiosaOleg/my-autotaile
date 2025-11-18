import { MessageCircle } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const topNavItems = [
  { label: "Головна", href: "/" },
  { label: "Про компанію", href: "/about" },
  { label: "Контакти", href: "/contacts" },
  { label: "Доставка і оплата", href: "/delivery" },
  { label: "Умови повернення", href: "/returnsPolicy" },
  { label: "Гарантія", href: "/warranty" },
];
  
export default function HeaderTop() {
  return (
    <div className="px-5 border-b border-(--border)/70 bg-(--background)/80">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-3 flex-wrap text-xs text-(--foreground)/70">
          <nav className="flex items-center gap-3 flex-wrap">
            {topNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-end gap-4 text-(--foreground)/70">
            <div className="hidden md:flex flex-wrap items-start justify-end gap-6 text-right">
              <div className="leading-tight">
                <span className="text-secondary font-semibold uppercase tracking-wide block">
                  Графік роботи
                </span>
                <div className="flex flex-col">
                  <span>Пн-Пт 10:00-17:00</span>
                  <span>Сб-Нд 10:00-16:00</span>
                </div>
              </div>
              <div className="leading-tight">
                <span className="text-secondary font-semibold uppercase tracking-wide block">
                  Обробка заявок
                </span>
                <span>Пн-Нд 10:00-21:00</span>
              </div>
            </div>
            <div className="mr-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="tel:+380983928740"
                className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors"
              >
                <span className="font-medium">38 (098) 392-87-40</span>
                <span className="w-7 h-7 rounded-full bg-(--brand-yellow-light) text-secondary flex items-center justify-center">
                  <MessageCircle size={14} />
                </span>
              </a>
              {/* <a
                href="tel:+380688363751"
                className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors"
              >
                <span className="font-medium">38 (068) 836-37-51</span>
                <span className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  <MessageCircle size={14} />
                </span>
              </a> */}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
