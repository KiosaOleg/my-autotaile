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
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
    color: "bg-pink-500 hover:bg-pink-600",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "#",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "#",
    color: "bg-red-600 hover:bg-red-700",
  },
];

export default function SocialLinks() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">
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
                  className={`${social.color} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110`}
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

