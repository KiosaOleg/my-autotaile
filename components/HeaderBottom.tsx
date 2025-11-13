"use client";

import Image from "next/image";
import { Search, User, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function HeaderBottom() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="sticky top-0 z-40 border-b border-(--border)/70 bg-background shadow-sm">
      <div className="container mx-auto px-4 py-2 lg:py-2">
        <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            <div className="relative w-16 h-16 lg:w-[72px] lg:h-[72px]">
              <Image
                src="/logo.jpg"
                alt="Kichuk Auto logo"
                fill
                priority
                sizes="72px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-center lg:text-left">
              <span className="text-(--foreground)/60 text-[10px] lg:text-xs font-semibold uppercase tracking-wider">
                автозапчастини
              </span>
              <span className="text-secondary text-xl lg:text-2xl font-bold tracking-tight">
                KICHUK AUTO
              </span>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 flex-1 min-w-[220px] justify-center">
            <div className="flex-1 min-w-[220px] max-w-xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Пошук по назві товару або VIN"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-border rounded-full bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-(--primary)/40 transition-all text-sm lg:text-base shadow-sm"
                />
                <Search
                  size={20}
                  className="absolute right-4 text-(--foreground)/50 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Quick Icons */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-secondary hover:border-primary hover:text-primary transition-colors">
              <User size={18} />
              Увійти
            </button>
            <button className="w-11 h-11 flex items-center justify-center rounded-full border border-border text-secondary hover:border-primary hover:text-primary transition-colors relative">
              <ShoppingCart size={19} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
