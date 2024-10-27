import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SeeAllButton = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-end ">
      <div
        className="w-fit flex gap-x-2 mx-4   justify-end items-center mb-4 cursor-pointer hover:underline hover:text-primary ease-in-out duration-300"
        onClick={() => {
          navigate("/products");
        }}
      >
        <p className="text-end md:text-base text-xs uppercase font-header">
          {t("see_all")}
        </p>
        {selectedLang === "en" || selectedLang === "fr" ? (
          <FaArrowRightLong />
        ) : (
          <FaArrowLeftLong />
        )}
      </div>
    </div>
  );
};

export default SeeAllButton;
