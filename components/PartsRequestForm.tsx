"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function PartsRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Тут буде логіка відправки форми
    alert("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative bg-[var(--background)] px-4">
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-gradient-to-br from-[var(--primary)] via-[var(--brand-yellow-dark)] to-[var(--secondary)] text-[var(--primary-foreground)] p-8 lg:p-12 flex flex-col justify-center gap-6">
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

            <div className="lg:w-1/2 p-6 lg:p-10 bg-[var(--background)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-[var(--secondary)] mb-2 uppercase tracking-wide">
                    Залиш контактні дані
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/70">
                    Ми передзвонимо або напишемо в месенджер протягом робочої
                    години.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--foreground)] mb-2"
                    >
                      Ваше ім'я
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
                      placeholder="Введіть ваше ім'я"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[var(--foreground)] mb-2"
                    >
                      Номер телефону
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
                      placeholder="+38 (0XX) XXX-XX-XX"
                    />
                  </div>

                  {/* <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--foreground)] mb-2"
                    >
                      Email або месенджер (необов'язково)
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
                      placeholder="your@email.com / Telegram / Viber"
                    />
                  </div> */}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--foreground)] mb-2"
                    >
                      Коментар (VIN-код, марка, модель)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 transition-all resize-none"
                      placeholder="Наприклад: VIN, рік випуску, потрібні деталі..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--secondary)] hover:bg-[var(--brand-black-soft)] text-[var(--secondary-foreground)] font-semibold py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <Send size={20} />
                  Відправити заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
