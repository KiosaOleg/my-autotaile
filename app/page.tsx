import PartsRequestButton from "@/components/PartsRequestButton";
import BannerCarousel from "@/components/BannerCarousel";
import TextBlock from "@/components/TextBlock";
import PopularProducts from "@/components/PopularProducts";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import PartsRequestForm from "@/components/PartsRequestForm";

export default function Home() {
  return (
    <main className="min-h-screen mx-4">
      <div className="flex flex-col gap-16 mb-16">
        {/* Герой банер */}
        <BannerCarousel />

        {/* Кнопка для відкриття форми підбору */}
        <PartsRequestButton />

        {/* Інформаційний блок */}
        <TextBlock />

        {/* Популярні товари */}
        <PopularProducts />

        {/* Соціальні мережі */}
        <SocialLinks />

        {/* Додаткова кнопка для форми */}
        <PartsRequestForm />
      </div>
    </main>
  );
}
