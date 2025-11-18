"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus, Trash2, Percent } from "lucide-react";
import Image from "next/image";

// Типи для товарів (потім замінити на API типи)
export interface CartItem {
  id: string;
  name: string;
  brand: string;
  code: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Приклад товарів (потім замінити на дані з API)
const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Комплект гальмівних колодок BOSCH 0986494042",
    brand: "BOSCH",
    code: "0986494042",
    price: 1560,
    quantity: 1,
    image: "/logo.jpg", // Замінити на реальні зображення товарів
  },
  {
    id: "2",
    name: "Повітряний фільтр BOSCH 1457433276",
    brand: "BOSCH",
    code: "1457433276",
    price: 890,
    quantity: 2,
    image: "/logo.jpg",
  },
  {
    id: "3",
    name: "Масляний фільтр MANN FILTER HU 718 X",
    brand: "MANN FILTER",
    code: "HU 718 X",
    price: 450,
    quantity: 1,
    image: "/logo.jpg",
  },
];

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-background rounded-3xl shadow-2xl border border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">Кошик</h2>
          <button
            onClick={onClose}
            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-border text-secondary hover:border-primary hover:text-primary transition-colors"
            aria-label="Закрити"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Кошик порожній</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-border rounded-2xl bg-card hover:bg-card/80 transition-colors"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-border shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground mb-1 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.brand} • {item.code}
                  </p>
                  <p className="text-lg font-bold text-secondary mt-2">
                    {item.price} ₴
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                    aria-label="Зменшити кількість"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-semibold text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                    aria-label="Збільшити кількість"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg border border-border text-destructive hover:border-destructive hover:bg-destructive/10 transition-colors shrink-0"
                  aria-label="Видалити товар"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Promotions Section */}
        <div className="px-6 pt-4 border-t border-border">
          <div className="bg-primary/10 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center shrink-0">
                <Percent size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Діючі АКЦІЇ
                </h3>
                <p className="text-xs text-muted-foreground">
                  Знижка -5% на комплект для ТО
                </p>
              </div>
              <button className="cursor-pointer text-xs font-semibold text-secondary hover:text-primary transition-colors">
                Детальніше
              </button>
            </div>
          </div>
        </div>

        {/* Footer with Total and Buttons */}
        <div className="p-6 border-t border-border bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-foreground">
              Разом:
            </span>
            <span className="text-2xl font-bold text-secondary">
              {totalPrice} ₴
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="cursor-pointer flex-1 px-6 py-3 rounded-full border-2 border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Продовжити покупки
            </button>
            <button
              onClick={() => {
                console.log("Order confirmed:", cartItems);
                alert("Замовлення підтверджено!");
                // Тут буде логіка підтвердження замовлення
              }}
              className="cursor-pointer flex-1 px-6 py-3 rounded-full bg-secondary hover:bg-[var(--brand-black-soft)] text-secondary-foreground font-semibold shadow-lg transition-all uppercase tracking-wide"
            >
              Замовлення підтверджую
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
