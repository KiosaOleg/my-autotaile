"use client";

import { useState } from "react";
import PartsRequestModal from "./PartsRequestModal";

export default function PartsRequestButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative bg-gradient-to-r from-secondary via-[var(--brand-black-soft)] to-secondary py-8 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-primary opacity-20 blur-3xl"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary opacity-10 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 uppercase">
              Потрібна допомога у виборі автозапчастин?
            </h2>
            <p className="text-lg text-[var(--brand-yellow-light)] mb-8">
              Залиш контакт і ми все зробимо за тебе
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer bg-primary hover:bg-[var(--brand-yellow-light)] text-primary-foreground font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all uppercase tracking-wide text-lg"
            >
              Залишити контакт
            </button>
          </div>
        </div>
      </section>

      <PartsRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
