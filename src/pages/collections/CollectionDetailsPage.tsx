import { useParams } from "react-router-dom";
import { useGetCollectionByIdInfoQuery } from "../../api/collections/queries";
import LoadingPage from "../loading-page";
import { useTranslation } from "react-i18next";
import ProductCard from "../../components/items/productCard";

const CollectionDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const {
    data: collectionInfo,
    isError,
    isFetching,
  } = useGetCollectionByIdInfoQuery(id);
  if (isFetching) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  return (
    <div className="px-2 py-10 md:px-4 lg:px-8 ">
      <h1 className="sm:2xl mb-12  scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">
        {`${t("products")}/ ${
          selectedLanguage === "en"
            ? collectionInfo?.name
            : selectedLanguage === "fr"
            ? collectionInfo?.nameFr
            : collectionInfo?.nameAr
        }`}
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {collectionInfo &&
        collectionInfo.products &&
        collectionInfo.products.length > 0 ? (
          collectionInfo.products.map(product => (
            <ProductCard
              key={product._id}
              {...{ ...product, isCarouselItem: false }}
            />
          ))
        ) : (
          <p className="text-gray-500">
            {t("no_products_in_this_collection")}.
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectionDetailsPage;
