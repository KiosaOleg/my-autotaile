import PartsRequestButton from "@/components/PartsRequestButton";
import BannerCarousel from "@/components/BannerCarousel";
import TextBlock from "@/components/TextBlock";
import PopularProducts from "@/components/PopularProducts";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import PartsRequestForm from "@/components/PartsRequestForm";
import FeaturedPart from "@/components/FeaturedPart";

export default function Home() {
  // ID деталі для відображення (можна змінити на будь-який існуючий ID)
  const featuredPartId = 1;

  return (
    <main className="min-h-screen">
      <div className="flex flex-col gap-16 mb-16">
        {/* Герой банер */}
        <BannerCarousel />

        {/* Кнопка для відкриття форми підбору */}
        <PartsRequestButton />

        {/* Інформаційний блок */}
        <TextBlock />

        {/* Рекомендована деталь з БД */}
        <FeaturedPart partId={featuredPartId} />

        {/* Популярні товари */}
        <PopularProducts />

        {/* Соціальні мережі */}
        <SocialLinks />

        {/* Додаткова кнопка для форми */}
        <PartsRequestForm />
      </div>

      {/* Підвал */}
      <Footer />
    </main>
  );
}
