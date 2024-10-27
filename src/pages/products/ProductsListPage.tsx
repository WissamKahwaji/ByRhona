import { useSearchParams } from "react-router-dom";
import { useGetCategoryWithProductsInfoQuery } from "../../api/categories/queries";
import ProductCard from "../../components/items/productCard";
import { useTranslation } from "react-i18next";
import LoadingPage from "../loading-page";
import { Slider } from "antd"; // Import Ant Design's Slider
import { useState } from "react";

const ProductsListPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const category = searchParams.get("category");

  // Fetching products by category
  const {
    data: productsByCategory,
    isError,
    isFetching,
  } = useGetCategoryWithProductsInfoQuery({
    category: categoryId,
  });

  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  // State to manage the price range
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Handle the price range change
  const onPriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]); // Convert number[] to [number, number] tuple
  };

  if (isFetching) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  // Filter the products by price range
  const filteredProducts = productsByCategory?.map(category => ({
    ...category,
    products: category.products?.filter(product =>
      product.priceAfterOffer
        ? product.priceAfterOffer.priceAED >= priceRange[0] &&
          product.priceAfterOffer.priceAED <= priceRange[1]
        : product.price.priceAED >= priceRange[0] &&
          product.price.priceAED <= priceRange[1]
    ),
  }));

  return (
    <div className="px-2 py-10 md:px-4 lg:px-8 ">
      {/* Title */}
      <h1 className="sm:2xl mb-12 scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">{`${t(
        "products"
      )}${category ? "/" + category : ""}`}</h1>

      {/* Price Filter Slider */}
      <div className="mb-8 max-w-md">
        <h2 className="text-lg font-medium mb-2">{t("filter_by_price")}</h2>
        <Slider
          range
          min={0}
          max={1000}
          defaultValue={[0, 1000]}
          value={priceRange}
          onChange={onPriceChange}
          style={{ direction: "ltr" }}
          className=""
        />
        <div
          className="flex justify-between text-sm"
          style={{ direction: "ltr" }}
        >
          <span>
            {t("min_price")}: {priceRange[0]} AED
          </span>
          <span>
            {t("max_price")}: {priceRange[1]} AED
          </span>
        </div>
      </div>

      {/* Product List */}
      <div className="flex flex-wrap items-center gap-10 md:gap-8">
        {filteredProducts &&
          filteredProducts.map(
            category =>
              category.products &&
              category.products.length !== 0 && (
                <div key={category._id}>
                  <h2 className="mb-2 scroll-m-20 text-3xl font-semibold uppercase tracking-tight first:mt-0 sm:mb-4 md:mb-8 text-secondary">
                    {selectedLanguage === "en"
                      ? category.name
                      : selectedLanguage === "fr"
                      ? category.nameFr
                      : category.nameAr}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {category.products.map(product => (
                      <ProductCard
                        key={product._id}
                        {...{ ...product, isCarouselItem: false }}
                      />
                    ))}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default ProductsListPage;
