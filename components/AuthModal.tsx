"use client";

import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Phone } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login:", {
        email: formData.email,
        password: formData.password,
      });
      // Тут буде логіка входу
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Паролі не співпадають");
        return;
      }
      console.log("Register:", formData);
      // Тут буде логіка реєстрації
    }
    // Після успішної авторизації можна закрити модалку
    // onClose();
  };

  const switchToRegister = () => {
    setIsLogin(false);
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
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
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
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
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
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Повторіть пароль"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full bg-secondary hover:bg-[var(--brand-black-soft)] text-secondary-foreground font-semibold py-4 rounded-full shadow-lg transition-all uppercase tracking-wide"
            >
              {isLogin ? "Увійти" : "Зареєструватися"}
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
                className="cursor-pointer text-secondary hover:text-primary font-semibold transition-colors"
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
