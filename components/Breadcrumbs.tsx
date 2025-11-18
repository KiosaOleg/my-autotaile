"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Warehouse } from "lucide-react";

const labelMap: Record<string, string> = {
  about: "Про компанію",
  contacts: "Контакти",
  delivery: "Доставка і оплата",
  returnsPolicy: "Умови повернення",
  warranty: "Гарантія",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const label = labelMap[segment] ?? segment.replace(/-/g, " ");
    const isLast = idx === segments.length - 1;

    return (
      <span
        key={href}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ChevronRight className="h-3.5 w-3.5 text-border" />
        {isLast ? (
          <span className="text-foreground ">{label}</span>
        ) : (
          <Link href={href} className="hover:text-secondary  transition-colors">
            {label}
          </Link>
        )}
      </span>
    );
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-background ml-4">
      <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-foreground font-medium hover:text-secondary transition-colors"
        >
          <Warehouse />
          {/* Головна */}
        </Link>
        {crumbs}
      </div>
    </nav>
  );
}
