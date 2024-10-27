import Carousel from "react-multi-carousel";
import { CAROUSAL_RESPONSIVE } from "../../../constants";
import ProductCard from "../../items/productCard";
import { useGetLastSixProductsQuery } from "../../../api/products/queries";
import { useTranslation } from "react-i18next";
import SeeAllButton from "../../ui/SeeAllButton";

const FeaturedProducts = () => {
  const {
    data: productsInfo,
    isLoading,
    isError,
  } = useGetLastSixProductsQuery();
  const { t } = useTranslation();

  if (isLoading) return <div>Loading ....</div>;
  if (isError) return <div>Error !!!</div>;

  return (
    <section className="flex flex-col gap-16 bg-gray-background py-12">
      <div>
        <h2 className="sm:2xl  scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">
          {t("featured_items")}
        </h2>
      </div>
      <div className="m-auto w-full lg:w-3/4 ">
        <SeeAllButton />
        {productsInfo && (
          <Carousel
            infinite
            autoPlay
            removeArrowOnDeviceType={"xs"}
            responsive={CAROUSAL_RESPONSIVE}
          >
            {productsInfo?.map(product => (
              <ProductCard
                key={product._id}
                {...{ ...product, isCarouselItem: true }}
              />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
