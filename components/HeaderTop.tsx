import { MessageCircle } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const topNavItems = [
  { label: "Про компанію", href: "#" },
  { label: "Контакти", href: "#" },
  { label: "Доставка і оплата", href: "#" },
  { label: "Умови повернення", href: "#" },
  // { label: "Політика конфіденційності", href: "#" },
  // { label: "Договір публічної оферти", href: "#" },
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
            <div className="hidden md:flex flex-col items-end leading-tight text-right">
              <span className="text-secondary font-semibold uppercase tracking-wide">
                Графік роботи
              </span>
              <span>Пн-Пт 9:00-18:00</span>
              <span>Сб 9:00-14:00</span>
            </div>
            <div className="mr-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="tel:+380934967470"
                className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors"
              >
                <span className="font-medium">38 (093) 496-74-70</span>
                <span className="w-7 h-7 rounded-full bg-(--brand-yellow-light) text-secondary flex items-center justify-center">
                  <MessageCircle size={14} />
                </span>
              </a>
              <a
                href="tel:+380688363751"
                className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors"
              >
                <span className="font-medium">38 (068) 836-37-51</span>
                <span className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  <MessageCircle size={14} />
                </span>
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
