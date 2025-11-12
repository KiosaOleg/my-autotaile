"use client";

import {
  CreditCard,
  FileText,
  Truck,
  RotateCcw,
  Shield,
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  MessageCircle,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAnalogues, setShowAnalogues] = useState(true);

  const navItems = [
    { icon: CreditCard, label: "Оплата", href: "#" },
    { icon: FileText, label: "Заказ", href: "#" },
    { icon: Truck, label: "Доставка", href: "#" },
    { icon: RotateCcw, label: "Возврат", href: "#" },
    { icon: Shield, label: "Гарантии", href: "#" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left Navigation Items */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 hover:text-blue-200 transition-colors text-xs xl:text-sm font-medium"
                  >
                    <Icon size={16} className="xl:w-[18px] xl:h-[18px]" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button className="lg:hidden hover:text-blue-200 transition-colors">
              <Menu size={24} />
            </button>

            {/* Right Side - Cart and Login */}
            <div className="flex items-center gap-4 xl:gap-6">
              <button className="relative hover:text-blue-200 transition-colors">
                <ShoppingCart size={20} className="xl:w-[22px] xl:h-[22px]" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <div className="flex items-center gap-2 xl:gap-3">
                <a
                  href="#"
                  className="text-xs xl:text-sm hover:text-blue-200 transition-colors hidden sm:inline"
                >
                  Регистрация
                </a>
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-blue-200 transition-colors">
                    <User size={18} className="xl:w-5 xl:h-5" />
                    <span className="text-xs xl:text-sm hidden sm:inline">Войти</span>
                    <ChevronDown size={14} className="xl:w-4 xl:h-4 hidden sm:inline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Section */}
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0 w-full lg:w-auto justify-center lg:justify-start">
            <div className="relative">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl lg:text-3xl font-bold">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-orange-500 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-500 text-[10px] lg:text-xs font-semibold uppercase tracking-wide">
                автозапчасти
              </span>
              <span className="text-blue-800 text-xl lg:text-2xl font-bold tracking-tight">
                AUTOPRO
              </span>
            </div>
          </div>

          {/* Search Bar Section */}
          <div className="flex-1 w-full lg:max-w-2xl">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Поиск запчасти"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 pr-10 lg:pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm lg:text-base"
                />
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 lg:px-4 py-2 lg:py-3 rounded-lg border-2 border-gray-300">
                <input
                  type="checkbox"
                  id="analogues"
                  checked={showAnalogues}
                  onChange={(e) => setShowAnalogues(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="analogues"
                  className="text-xs lg:text-sm font-medium text-gray-700 cursor-pointer whitespace-nowrap"
                >
                  Аналоги
                </label>
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-2.5 lg:p-3 rounded-lg shadow-md transition-all hover:shadow-lg">
                <Search size={20} className="lg:w-[22px] lg:h-[22px]" />
              </button>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="flex-shrink-0 text-center lg:text-right w-full lg:w-auto">
            <div className="mb-2">
              <p className="text-xs lg:text-sm text-gray-600 font-medium">Время работы:</p>
              <p className="text-xs lg:text-sm text-gray-800 font-semibold">
                Пн-Пт с 9.00-18.00
              </p>
              <p className="text-xs lg:text-sm text-gray-800 font-semibold">
                Сб с 9.00-14.00
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-3 items-center lg:items-end">
              <a
                href="tel:+380934967470"
                className="flex items-center gap-2 text-xs lg:text-sm text-gray-800 hover:text-blue-600 transition-colors font-medium"
              >
                <span>38 (093) 496-74-70</span>
                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={12} className="lg:w-[14px] lg:h-[14px] text-white" />
                </div>
              </a>
              <a
                href="tel:+380688363751"
                className="flex items-center gap-2 text-xs lg:text-sm text-gray-800 hover:text-blue-600 transition-colors font-medium"
              >
                <span>38 (068) 836-37-51</span>
                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={12} className="lg:w-[14px] lg:h-[14px] text-white" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

