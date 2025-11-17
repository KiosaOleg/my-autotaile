import PartsRequestButton from "@/components/PartsRequestButton";
import TikTokIcon from "@/public/TikTokIcon";
import { Phone, Mail, MapPin, Send, Instagram, Youtube } from "lucide-react";

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-background mx-4 ">
      <section className="container mx-auto px-4 pb-8 ">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] mb-8">
          <div className="rounded-3xl border border-border bg-card/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">
                Наша адреса
              </h1>
              <p className="text-sm text-muted-foreground">
                м. Одеса, 65121
                <br />
                Проспект Небесної Сотні 2А,
                <br /> ринок Успіх, магазин 214
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Звʼяжіться з нами:
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="tel:+380983928740"
                  className="flex items-center gap-2 hover:text-secondary"
                >
                  <Phone size={16} /> +38 098 392-87-40
                </a>

                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://t.me/kichuk_auto"
                    className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary/20"
                  >
                    <Send size={16} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@kichuk_auto?_r=1&_t=ZS-91OK70ojHQD"
                    className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary/20"
                  >
                    <TikTokIcon size={16} />
                  </a>
                  <a
                    href="https://www.instagram.com/kichuk_auto?igsh=Nm81NnI0Z2M4MjRv&utm_source=qr"
                    className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary/20"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://www.instagram.com/kichuk_auto?igsh=Nm81NnI0Z2M4MjRv&utm_source=qr"
                    className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary/20"
                  >
                    <Youtube size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-foreground font-semibold">Email:</p>
              <a
                href="mailto:support@kichukauto.com.ua"
                className="text-sm text-secondary hover:underline"
              >
                support@kichukauto.com.ua
              </a>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Графік роботи:
              </h2>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Пн–Пт:</span>{" "}
                10:00 – 17:00
                <br />
                <span className="font-semibold text-foreground">
                  Сб–Нд:
                </span>{" "}
                10:00 – 16:00
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Обробка заявок:
              </h2>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Пн–Нд:</span>{" "}
                10:00 – 21:00
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border shadow-sm h-[320px] sm:h-[360px] lg:h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d771.8434568113316!2d30.71428555155205!3d46.418226889399136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDbCsDI1JzA1LjciTiAzMMKwNDInNTEuNiJF!5e0!3m2!1suk!2sbg!4v1763375206820!5m2!1suk!2sbg"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
        <PartsRequestButton />
      </section>
    </main>
  );
}
