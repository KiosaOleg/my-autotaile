import PartsRequestForm from "@/components/PartsRequestForm";
import BannerCarousel from "@/components/BannerCarousel";
import TextBlock from "@/components/TextBlock";
import PopularProducts from "@/components/PopularProducts";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Блок 3: Форма для заявки на підбір запчастин */}
      <PartsRequestForm />

      {/* Блок 4: Банери що гортаються */}
      <BannerCarousel />

      {/* Блок 5: Текстовий блок */}
      <TextBlock />

      {/* Блок 6: Популярні товари */}
      <PopularProducts />

      {/* Блок 7: Іконки соціальних сторінок */}
      <SocialLinks />

      {/* Блок 8: Форма для заявки на підбір запчастин (друга) */}
      <PartsRequestForm />

      {/* Блок 9: Підвал */}
      <Footer />
    </main>
  );
}
