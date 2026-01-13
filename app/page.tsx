import PartsRequestButton from "@/components/PartsRequestButton";
import BannerCarousel from "@/components/BannerCarousel";
import TextBlock from "@/components/TextBlock";
import PopularProducts from "@/components/PopularProducts";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import PartsRequestForm from "@/components/PartsRequestForm";
import FeaturedPartsList from "@/components/FeaturedPart";

// Динамічна сторінка, оскільки FeaturedPart робить запит до БД
export const dynamic = "force-dynamic";

export default function Home() {
  // ID виробника для відображення деталі (замість partId)
  // const featuredSupplierId = 1;

  return (
    <main className="min-h-screen">
      <div className="flex flex-col gap-16 mb-16">
        <BannerCarousel />
        <PartsRequestButton />
        <TextBlock />

        {/* Рекомендована деталь з БД */}
        <FeaturedPartsList />

        <PopularProducts />
        <SocialLinks />
        <PartsRequestForm />
      </div>

      <Footer />
    </main>
  );
}
