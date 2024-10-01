import { useSearchParams } from "react-router-dom";
import { useGetCategoryWithProductsInfoQuery } from "../../api/categories/queries";
import ProductCard from "../../components/items/productCard";
import { useTranslation } from "react-i18next";

const ProductsListPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const category = searchParams.get("category");
  const { data: productsByCategory } = useGetCategoryWithProductsInfoQuery({
    category: categoryId,
  });

  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  return (
    <div className="px-2 py-10 md:px-4 lg:px-8 ">
      <h1 className="sm:2xl mb-12  scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">{`${t(
        "products"
      )}${category ? "/" + category : ""}`}</h1>
      <div className=" flex flex-wrap items-center  gap-10  md:gap-8 ">
        {productsByCategory?.map(
          category =>
            category.products &&
            category.products.length !== 0 && (
              <div key={category._id}>
                <h2 className="mb-2  scroll-m-20  text-3xl font-semibold uppercase tracking-tight first:mt-0 sm:mb-4 md:mb-8 text-secondary">
                  {selectedLanguage === "en-GB"
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
