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
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ShippingSlider from "../../components/pages/home/ShippingSlider";
import HappyClients from "../clients-reviews/HappyClients";
import { useGetReviresInfo } from "../../api/clients-reviews/queries";

const HomePage = () => {
  const { data: aboutUsInfo, isLoading, isError } = useGetAboutUsInfoQuery();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const {
    data: slidersInfo,
    isLoading: isLoadingSliders,
    isError: isErrorSliders,
  } = useGetSlidersInfo();

  const {
    data: reviewsInfo,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useGetReviresInfo();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isSignedIn = isAuthenticated;
    const hasDismissedPopup = localStorage.getItem("hasDismissedPopup");

    if (!isSignedIn && !hasDismissedPopup) {
      setShowPopup(true);
    }
  }, [isAuthenticated]);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem("hasDismissedPopup", "true");
    location.reload();
  };

  if (isLoading || isLoadingSliders || isLoadingReviews) return <LoadingPage />;
  if (isError || isErrorSliders || isErrorReviews) return <div>Error !!!</div>;
  return (
    <div className="text-black">
      {/* Pop-up modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg md:max-w-sm max-w-xs text-center">
            <p className="text-lg font-bold">{t("signup_popup_desc")}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => (window.location.href = "/signup")} // Redirect to signup page
                className="bg-primary text-white px-4 py-2 rounded"
              >
                {t("signup")}
              </button>
              <button
                onClick={handleClosePopup}
                className="text-primary border border-primary px-4 py-2 rounded"
              >
                {t("skip")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Home page content */}
      {slidersInfo?.shippingSlider && (
        <ShippingSlider content={slidersInfo?.shippingSlider} />
      )}
      <HomeSlider images={slidersInfo?.images} videos={slidersInfo?.videos} />
      <OffersSection />
      <VoucherSection />
      <CollectionsCategory />
      <FeaturedProducts />
      <ProductSection />
      {reviewsInfo?.images && <HappyClients images={reviewsInfo?.images} />}
      <section className="py-12 bg-gray-background mt-3 md:mt-3 lg:mt-10 xl:mt-12">
        <h2 className="mb-2 scroll-m-20 text-center text-3xl font-semibold uppercase tracking-tight first:mt-0 sm:mb-4 md:mb-8">
          {t("about_us")}
        </h2>
        <AboutUsInfo aboutUsContent={aboutUsInfo?.content} />
      </section>
    </div>
  );
};

export default HomePage;
