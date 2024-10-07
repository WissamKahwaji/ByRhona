import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useGetProductByIdInfoQuery } from "../../api/products/queries";
import LoadingPage from "../loading-page";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useForm } from "react-hook-form";
import addToCartValidationSchema, {
  AddToCartValues,
} from "../../utils/validations/product";
import { addToCart } from "../../features/cart/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaRegPlayCircle } from "react-icons/fa";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const navigate = useNavigate();
  const {
    data: productInfo,
    isFetching,
    isError,
  } = useGetProductByIdInfoQuery(id);

  const { watch, setValue, handleSubmit } = useForm<AddToCartValues>({
    resolver: zodResolver(addToCartValidationSchema),
    defaultValues: {
      count: 1,
    },
  });

  const onSubmit = (values: AddToCartValues) => {
    console.log("enter submit area");
    if (isAuthenticated) {
      dispatch(
        addToCart({
          ...productInfo,
          count: values.count,
          localId: new Date(),
          note: values.note,
        })
      );
    } else {
      toast.info("Please login first to add to cart");
      navigate("/signin");
    }
  };

  const [mainMedia, setMainMedia] = useState<string | null>(
    productInfo?.img || null
  );

  useEffect(() => {
    if (productInfo) {
      setMainMedia(productInfo.img);
    }
  }, [productInfo]);

  const handleMediaClick = (media: string) => {
    setMainMedia(media);
  };

  if (isFetching) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  return (
    <div className="py-24 font-header">
      <div className="flex flex-col justify-center gap-4 bg-gray-background px-6 py-4 md:flex-row md:gap-6">
        {/* Product Title */}
        <p className="sm:2xl lg:5xl border-b border-border pb-4 text-xl font-semibold uppercase md:hidden md:text-4xl text-primary">
          {selectedLanguage === "en"
            ? productInfo?.title
            : selectedLanguage === "fr"
            ? productInfo?.titleFr
            : productInfo?.titleAr}
        </p>

        {/* Main Image/Video Section */}
        <div className="h-60 w-60 md:h-[450px] md:w-[450px]">
          {mainMedia?.includes(".mp4") ? (
            <video
              className="h-full w-full object-contain"
              controls
              autoPlay
              muted
            >
              <source src={mainMedia} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              className="aspect-square h-full w-full object-cover"
              src={mainMedia ?? ""}
              alt={productInfo?.title}
            />
          )}
          {/* Thumbnails Section */}
          <div className="mt-6 flex gap-4 overflow-x-auto ">
            {productInfo?.img && (
              <img
                className={`h-16 w-16 object-cover cursor-pointer ${
                  mainMedia === productInfo.img ? "border-2 border-primary" : ""
                }`}
                src={productInfo.img}
                alt="Main product image"
                onClick={() => handleMediaClick(productInfo.img)}
              />
            )}
            {productInfo?.imgs?.map((img, index) => (
              <img
                key={index}
                className={`h-16 w-16 object-cover cursor-pointer ${
                  mainMedia === img ? "border-2 border-primary" : ""
                }`}
                src={img}
                alt={`product-thumbnail-${index}`}
                onClick={() => handleMediaClick(img)}
              />
            ))}
            {productInfo?.videos?.map((video, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => handleMediaClick(video)}
              >
                <video
                  className={`h-16 w-16 object-cover  ${
                    mainMedia === video ? "border-2 border-primary" : ""
                  }`}
                >
                  <source src={video} type="video/mp4" />
                </video>
                <FaRegPlayCircle className="absolute inset-1/4 w-8 h-8 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Information Section */}
        <div className="flex flex-col gap-4 md:max-w-[500px] md:gap-6 mt-24 md:mt-0">
          <p className="sm:2xl lg:5xl hidden border-b border-border pb-4 text-xl font-semibold uppercase md:block md:text-2xl text-primary">
            {selectedLanguage === "en"
              ? productInfo?.title
              : selectedLanguage === "fr"
              ? productInfo?.titleFr
              : productInfo?.titleAr}
          </p>

          <div className="flex items-center gap-2 text-secondary">
            <p className="font-semibold capitalize md:text-lg">
              {t("category")}:
            </p>
            <p className="sm:text-lg md:text-lg">
              {selectedLanguage === "en"
                ? productInfo?.category.name
                : selectedLanguage === "fr"
                ? productInfo?.category.nameFr
                : productInfo?.category.nameAr}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex items-center gap-2">
              <p className="font-semibold capitalize md:text-lg">
                {t("price")}:
              </p>
              <p
                className={`text-muted-foreground sm:text-lg md:text-lg ${
                  productInfo?.isOffer ? "text-foreground line-through" : ""
                }`}
              >
                <span className="mr-1">{productInfo?.price.priceAED}</span>
                <span className="uppercase">{t("aed")}</span>
                {" / "}
                <span className="mr-1">{productInfo?.price.priceUSD}</span>
                <span className="uppercase">$</span>
              </p>
            </div>
            {productInfo?.isOffer && productInfo.priceAfterOffer && (
              <div className="flex items-center gap-2">
                <p className="font-semibold capitalize md:text-lg">
                  {t("offer")}:
                </p>
                <p className={`text-muted-foreground sm:text-lg md:text-lg`}>
                  <span className="mr-1">
                    {productInfo?.priceAfterOffer.priceAED}
                  </span>
                  <span className="uppercase">{t("aed")}</span>
                  {" / "}
                  <span className="mr-1">
                    {productInfo?.priceAfterOffer.priceUSD}
                  </span>
                  <span className="uppercase">$</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold capitalize md:text-lg">
              {t("quantity")}:
            </p>
            <p
              className={`text-muted-foreground sm:text-lg md:text-lg ${
                productInfo?.productQuantity && productInfo?.productQuantity > 0
                  ? ""
                  : "text-red-600"
              }`}
            >
              {productInfo?.productQuantity && productInfo?.productQuantity > 0
                ? productInfo?.productQuantity
                : t("out_of_stock")}
            </p>
          </div>
          <div className="overflow-hidden whitespace-pre-wrap">
            <p>
              {selectedLanguage === "en"
                ? productInfo?.desc
                : selectedLanguage === "fr"
                ? productInfo?.descFr
                : productInfo?.descAr}
            </p>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-4">
              <input
                type="number"
                name="count"
                value={watch("count")}
                className="border bg-background p-2 px-4 shadow-sm"
              />
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setValue("count", watch("count") + 1)}
                  className="transition-transform hover:scale-90"
                >
                  <CiSquarePlus className="h-12 w-12" />
                </button>
                <button
                  type="button"
                  onClick={() => setValue("count", watch("count") - 1)}
                  className="transition-transform hover:scale-90 disabled:hover:scale-100"
                >
                  <CiSquareMinus className="h-12 w-12" />
                </button>
              </div>
            </div>
            <div className="items-center space-y-2 md:w-[80%]">
              <p className="text-sm text-gray-700">
                {t("please_enter_any_notes_or_requests_about_your_order")}
              </p>
              <textarea
                name="note"
                id="note"
                value={watch("note")}
                onChange={e => setValue("note", e.target.value)}
                className="min-h-[100px] w-full border bg-background p-2 px-4 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded w-full px-2 py-2 bg-foreground font-body font-semibold capitalize hover:bg-primary hover:text-white duration-300 transform ease-in-out"
            >
              {t("add_to_cart")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
