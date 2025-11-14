"use client";

import { Instagram, Send, Youtube } from "lucide-react";

// TikTok icon (бо в lucide-react її нема)
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M12.75 2a5.23 5.23 0 0 0 .08 1.06c.2 1.02.73 1.9 1.5 2.61a6.1 6.1 0 0 0 3.04 1.49v3.1a8.68 8.68 0 0 1-3.45-.87v5.39a6.15 6.15 0 1 1-6.15-6.15c.33 0 .67.03 1 .1v3.2a3.05 3.05 0 1 0 2.1 2.9V2h1.88Z" />
  </svg>
);

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
    href: "https://t.me/kichuk_auto",
    color:
      "bg-[var(--primary)] hover:bg-[var(--brand-yellow-light)] text-[var(--primary-foreground)]",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@kichuk_auto?_r=1&_t=ZS-91OK70ojHQD",
    color:
      "bg-[var(--secondary)] hover:bg-[var(--brand-yellow-light)] text-[var(--secondary-foreground)]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/kichuk_auto?igsh=Nm81NnI0Z2M4MjRv&utm_source=qr",
    color:
      "bg-[var(--secondary)] hover:bg-[var(--brand-yellow-light)] text-[var(--secondary-foreground)]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@kichuk_auto?si=jyGL2thuvCd2BUfG",
    color:
      "bg-[var(--brand-yellow-dark)] hover:bg-[var(--brand-yellow-light)] text-[var(--primary-foreground)]",
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
