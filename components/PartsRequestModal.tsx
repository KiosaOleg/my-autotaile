"use client";

import { useState, useEffect } from "react";
import { Send, X } from "lucide-react";

interface PartsRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartsRequestModal({
  isOpen,
  onClose,
}: PartsRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
    setFormData({ name: "", phone: "", email: "", message: "" });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl border border-border">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Info Panel */}
          <div className="lg:w-1/2 bg-gradient-to-br from-primary via-[var(--brand-yellow-dark)] to-secondary text-primary-foreground p-8 lg:p-12 flex flex-col justify-center gap-6">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/20 text-xs font-semibold uppercase tracking-[0.25em] px-3 py-1 rounded-full">
                VIN-сервіс
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              Потрібна допомога у виборі автозапчастин?
            </h2>
            <p className="text-sm lg:text-base text-white/80">
              Заповніть форму поруч і наш менеджер підбере оригінальні або
              якісні аналоги саме під ваш VIN. Безкоштовна консультація та
              супровід замовлення.
            </p>
            <ul className="space-y-2 text-sm lg:text-base text-white/70">
              <li>• Підбір деталей до 15 хвилин</li>
              <li>• Фото та наявність з актуальних складів</li>
              <li>• Персональний менеджер 7 днів на тиждень</li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-6 lg:p-10 bg-background relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-border text-secondary hover:border-primary hover:text-primary transition-colors"
              aria-label="Закрити"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-semibold text-secondary mb-2 uppercase tracking-wide">
                  Залиш контактні дані
                </h3>
                <p className="text-sm text-foreground/70">
                  Ми передзвонимо або напишемо в месенджер протягом робочої
                  години.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Ваше ім'я
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Введіть ваше ім'я"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Номер телефону
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="+38 (0XX) XXX-XX-XX"
                  />
                </div>

                {/* <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email або месенджер (необов'язково)
                  </label>
                  <input
                    type="text"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="your@email.com / Telegram / Viber"
                  />
                </div> */}

                <div>
                  <label
                    htmlFor="modal-message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Коментар (VIN-код, марка, модель)
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    placeholder="Наприклад: VIN, рік випуску, потрібні деталі..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary hover:bg-[var(--brand-black-soft)] text-secondary-foreground font-semibold py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <Send size={20} />
                Відправити заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
