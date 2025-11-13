"use client";

import { Instagram, Send, Facebook, Youtube } from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Telegram",
    icon: Send,
    href: "#",
    color:
      "bg-[var(--primary)] hover:bg-[var(--brand-yellow-light)] text-[var(--primary-foreground)]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
    color:
      "bg-[var(--secondary)] hover:bg-[var(--brand-black-soft)] text-[var(--secondary-foreground)]",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "#",
    color:
      "bg-[var(--secondary-foreground)] hover:bg-[var(--brand-yellow-light)] text-[var(--secondary)]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "#",
    color:
      "bg-[var(--brand-yellow-dark)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)]",
  },
];

export default function SocialLinks() {
  return (
    <section className="bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-lg px-6 py-10 flex flex-col items-center gap-6">
          <h3 className="text-xl font-semibold text-[var(--secondary)] uppercase tracking-wide">
            Ми в соціальних мережах
          </h3>
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
