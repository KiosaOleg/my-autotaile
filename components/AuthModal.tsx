"use client";

import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Phone, LogOut } from "lucide-react";
import { isAuthenticated, removeAuthToken } from "@/lib/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null); // Очищаємо помилку при зміні полів
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        // Логіка входу
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Помилка авторизації");
        }

        // Зберігаємо токен в localStorage
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
          // Можна також зберегти email для відображення
          localStorage.setItem("user_email", formData.email);
        }

        // Закриваємо модалку після успішної авторизації
        onClose();

        // Оновлюємо сторінку або викликаємо callback для оновлення UI
        // Замість window.location.reload() можна використати подію для оновлення стану
        window.dispatchEvent(new Event("storage"));
        // Або просто оновити сторінку
        window.location.reload(); // або використайте більш елегантне рішення з контекстом
      } else {
        // Логіка реєстрації (якщо потрібна)
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Паролі не співпадають");
        }
        // Тут буде логіка реєстрації через API
        console.log("Register:", formData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Сталася помилка");
    } finally {
      setIsLoading(false);
    }
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setError(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setError(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-background rounded-3xl shadow-2xl border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-border text-secondary hover:border-primary hover:text-primary transition-colors z-10"
          aria-label="Закрити"
        >
          <X size={20} />
        </button>

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {isLogin ? "Вхід" : "Реєстрація"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Увійдіть у свій обліковий запис"
                : "Створіть новий обліковий запис"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Ім'я
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Введіть ваше ім'я"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email або телефон
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
                  placeholder="email@example.com або +38 (0XX) XXX-XX-XX"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Пароль
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
                  placeholder="Введіть пароль"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Підтвердіть пароль
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
                    placeholder="Повторіть пароль"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-secondary hover:bg-[var(--brand-black-soft)] text-secondary-foreground font-semibold py-4 rounded-full shadow-lg transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Завантаження..."
                : isLogin
                ? "Увійти"
                : "Зареєструватися"}
            </button>
          </form>

          {/* Switch between Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Ще не зареєстровані? "
                : "Вже маєте обліковий запис? "}
              <button
                type="button"
                onClick={isLogin ? switchToRegister : switchToLogin}
                disabled={isLoading}
                className="cursor-pointer text-secondary hover:text-primary font-semibold transition-colors disabled:opacity-50"
              >
                {isLogin ? "Зареєструватися" : "Увійти"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
