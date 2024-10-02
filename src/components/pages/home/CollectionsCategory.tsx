import { Link } from "react-router-dom";
import { COLLECTION_CAROUSAL_RESPONSIVE } from "../../../constants";
import Carousel from "react-multi-carousel";
import { useGetCollectionsInfoQuery } from "../../../api/collections/queries";
import { useTranslation } from "react-i18next";

const CollectionsCategory = () => {
  const {
    data: collectionsInfo,
    isError,
    isLoading,
  } = useGetCollectionsInfoQuery();

  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  if (isError || isLoading) return <div></div>;

  return (
    <section className=" flex flex-col gap-8 bg-gray-background py-12 md:gap-16 font-header">
      <div>
        <h2 className="sm:2xl  scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">
          {t("collections_category")}
        </h2>
      </div>
      {/* <div className="flex flex-wrap items-center justify-center gap-4 "> */}
      {collectionsInfo && (
        <Carousel
          infinite
          autoPlay
          removeArrowOnDeviceType={"xs"}
          responsive={COLLECTION_CAROUSAL_RESPONSIVE}
        >
          {collectionsInfo?.map(collection => (
            <div className=" px-3 sm:px-6 md:px-9 lg:px-12  ">
              <Link
                to={`/products?type_id=${collection._id}&type=${collection.name}`}
              >
                <div
                  key={collection._id}
                  className="group flex  flex-col items-center gap-8 overflow-hidden  "
                >
                  <div className=" h-full  w-full overflow-hidden  ">
                    <img
                      className="aspect-square h-full w-full object-cover transition-transform group-hover:rotate-1 group-hover:scale-105"
                      src={collection.image}
                      alt={collection.name}
                    />
                  </div>
                  <p className="text-sm font-semibold uppercase md:text-lg text-secondary">
                    {selectedLanguage === "en"
                      ? collection.name
                      : selectedLanguage === "fr"
                      ? collection.nameFr
                      : collection.nameAr}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      )}
      {/* </div> */}
    </section>
  );
};

export default CollectionsCategory;
