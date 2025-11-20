"use client";

import Image from "next/image";
import { Search, User, ShoppingCart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import CartModal from "./CartModal";
import { isAuthenticated, removeAuthToken } from "@/lib/api";

export default function HeaderBottom() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  // Потім замінити на реальну кількість з API/контексту
  const [cartItemsCount] = useState(3); // Приклад: 3 товари

  // Перевіряємо статус авторизації при завантаженні та зміні стану
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        const email = localStorage.getItem("user_email");
        setUserEmail(email);
      } else {
        setUserEmail(null);
      }
    };

    // Перевіряємо при завантаженні
    checkAuth();

    // Слухаємо події збереження в localStorage (для оновлення після входу)
    const handleStorageChange = () => {
      checkAuth();
    };

    // Слухаємо зміни в localStorage
    window.addEventListener("storage", handleStorageChange);

    // Також перевіряємо періодично (на випадок, якщо зміни відбулися в тому ж вікні)
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    setUserEmail(null);
    // Оновлюємо сторінку для оновлення UI
    window.location.reload();
  };

  return (
    <>
      <div className="px-5 sticky top-0 z-40 border-b border-(--border)/70 bg-background shadow-sm">
        <div className="container mx-auto px-4 py-2 lg:py-2">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 lg:gap-4 shrink-0"
            >
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
                <span className="text-secondary text-xl lg:text-2xl font-bold tracking-tight">
                  KICHUK AUTOPARTS
                </span>
                <span className="text-(--foreground)/60 text-[10px] lg:text-xs font-semibold uppercase tracking-wider">
                  твій ритм руху
                </span>
              </div>
            </Link>

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
              {isLoggedIn ? (
                <div className="hidden lg:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card">
                    <User size={18} className="text-secondary" />
                    <span className="text-sm font-medium text-foreground">
                      {userEmail || "Користувач"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-sm font-medium text-secondary hover:border-primary hover:text-primary transition-colors"
                    title="Вийти"
                  >
                    <LogOut size={18} />
                    <span className="hidden xl:inline">Вийти</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="cursor-pointer hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-secondary hover:border-primary hover:text-primary transition-colors"
                >
                  <User size={18} />
                  Увійти
                </button>
              )}
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-full border border-border text-secondary hover:border-primary hover:text-primary transition-colors relative"
                aria-label="Відкрити кошик"
              >
                <ShoppingCart size={19} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}
