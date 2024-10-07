import AboutUsInfo from "../../components/items/aboutUsInfo";
import CollectionsCategory from "../../components/pages/home/CollectionsCategory";
import FeaturedProducts from "../../components/pages/home/FeaturedProducts";
import HomeSlider from "../../components/pages/home/HomeSlider";
import OffersSection from "../../components/pages/home/OffersSection";
import ProductSection from "../../components/pages/home/ProductSection";
import { useGetAboutUsInfoQuery } from "../../api/about-us/queries";
import LoadingPage from "../loading-page";
import { useGetSlidersInfo } from "../../api/sliders/queries";
import { useTranslation } from "react-i18next";
import VoucherSection from "../../components/pages/home/VoucherSection";

const HomePage = () => {
  const { data: aboutUsInfo, isLoading, isError } = useGetAboutUsInfoQuery();
  const { t } = useTranslation();
  const {
    data: slidersInfo,
    isLoading: isLoadingSliders,
    isError: isErrorSliders,
  } = useGetSlidersInfo();
  if (isLoading || isLoadingSliders) return <LoadingPage />;
  if (isError || isErrorSliders) return <div>Error !!!</div>;
  return (
    <div className="text-black">
      <HomeSlider images={slidersInfo?.images} />
      <section className="py-12   bg-foreground/20 mt-3 md:mt-3 lg:mt-10 xl:mt-12">
        <h2 className="mb-2  scroll-m-20 text-center text-3xl font-semibold uppercase tracking-tight first:mt-0 sm:mb-4 md:mb-8">
          {t("about_us")}
        </h2>
        <AboutUsInfo aboutUsContent={aboutUsInfo?.content} />
      </section>
      <VoucherSection />
      <ProductSection />
      <CollectionsCategory />
      <OffersSection />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
