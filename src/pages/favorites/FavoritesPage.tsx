import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserFavoritesListQuery,
  useRemoveProductFromFavoritesMutation,
} from "../../api/user/queries";
import { useTranslation } from "react-i18next";
import LoadingPage from "../loading-page";
import { MdFavorite } from "react-icons/md";

const FavoritesPage = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const {
    data: favoritesListInfo,
    isLoading,
    isError,
  } = useGetUserFavoritesListQuery(id ?? "");
  const { mutate: removeItem } = useRemoveProductFromFavoritesMutation();
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  if (isLoading) return <LoadingPage />;
  if (isError) return <></>;
  return (
    <div className="m-auto max-w-6xl py-12 md:py-12 ">
      <p className=" pb-6 text-center text-2xl font-bold  capitalize text-black md:pb-8">
        {t("my_favorites")}
      </p>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {favoritesListInfo && favoritesListInfo.length > 0 ? (
          favoritesListInfo.map((product, index) => (
            <div
              key={index}
              className="w-full p-2 rounded-sm shadow-sm shadow-primary border border-gray-200 flex flex-row gap-x-2 justify-start items-center cursor-pointer hover:scale-105 duration-300 ease-in-out "
              onClick={() => {
                navigate(`/products/${product.productId}`);
              }}
            >
              <img
                src={product.img}
                alt=""
                className="w-20 h-20"
                crossOrigin="anonymous"
              />
              <div className="space-y-2">
                <p className="text-sm text-primary font-semibold line-clamp-1 capitalize">
                  {selectedLanguage === "en"
                    ? product.title
                    : selectedLanguage === "fr"
                    ? product.titleFr
                    : product.titleAr}
                </p>
                <p className="line-clamp-3 text-xs text-gray-400">
                  {selectedLanguage === "en"
                    ? product.desc
                    : selectedLanguage === "fr"
                    ? product.descFr
                    : product.descAr}
                </p>
                <div className="w-full flex flex-row justify-between items-center">
                  <p
                    className={`text-sm text-muted-foreground md:text-xs lg:text-xs `}
                  >
                    <span className="mr-1">{product.price.priceAED}</span>
                    <span className="uppercase">{t("aed")}</span>
                    {" / "}
                    <span className="mr-1">{product.price.priceUSD}</span>
                    <span className="uppercase">$</span>
                  </p>
                  <MdFavorite
                    className="text-red-600 text-lg cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      removeItem({
                        userId: id ?? "",
                        productId: product.productId,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            <p>{t("no_items_in_your_favorites")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
