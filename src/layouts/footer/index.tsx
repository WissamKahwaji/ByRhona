import { AiFillTikTok } from "react-icons/ai";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetContactUsInfo } from "../../api/contact-us/queries";
import { useGetDepartmentsInfoQuery } from "../../api/departments/queries";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { data: contactUsInfo } = useGetContactUsInfo();
  const { data: departmentsInfo } = useGetDepartmentsInfoQuery();

  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  return (
    <div className="flex w-full flex-col font-header">
      <div className="flex flex-col w-full justify-between items-center gap-8 border-t border-foreground bg-foreground/30 px-6 py-8 shadow-negative md:flex-col md:gap-10  md:px-12  md:py-6 ">
        <div>
          <Link to={"/"} className="">
            <div className="flex flex-row">
              <img
                src="https://i.imgur.com/GhSSHdx.png"
                alt=""
                className="h-auto w-32 "
              />
            </div>
          </Link>
        </div>
        <div className="hidden md:flex flex-row space-x-8 items-start justify-around w-full mt-8">
          <div className="">
            <p className="mb-3 text-xl font-semibold capitalize text-secondary">
              {t("useful_links")}
            </p>
            <ul className="flex flex-col justify-center gap-2 text-sm">
              <li>
                <Link to={"/"}>
                  <p className=" font-semibold capitalize text-gray-700">
                    {t("home")}
                  </p>
                </Link>
              </li>
              <li>
                <Link to={"/about-us"}>
                  <p className=" font-semibold capitalize text-gray-700">
                    {t("about_us")}
                  </p>
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"}>
                  <p className=" font-semibold capitalize text-gray-700">
                    {t("contact_us")}
                  </p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="mb-3 text-xl font-semibold capitalize text-secondary">
              {t("shop")}
            </p>
            <ul className="grid grid-cols-2 gap-x-4 justify-center gap-2 text-sm">
              <li>
                <Link to={`/products`}>
                  <p className=" font-semibold capitalize text-gray-700">
                    {t("all_products")}
                  </p>
                </Link>
              </li>
              {departmentsInfo?.slice(0, 4).map(department =>
                department.categories.slice(0, 4).map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`/products?category=${category.name}&categoryId=${category._id}`}
                      reloadDocument
                    >
                      <p className=" font-semibold capitalize text-gray-700">
                        {selectedLanguage === "en"
                          ? category.name
                          : selectedLanguage === "fr"
                          ? category.nameFr
                          : category.nameAr}
                      </p>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xl font-semibold capitalize text-secondary">
              {t("get_in_touch")}
            </p>

            <ul className="flex flex-col justify-center gap-2 text-sm">
              <li>
                <p className="font-semibold">info@byrhona.com</p>
              </li>

              <li>
                <p className="font-semibold" style={{ direction: "ltr" }}>
                  +971 5081 537 35{" "}
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xl font-semibold capitalize text-secondary">
              {t("social_media")}
            </p>

            <ul className="mb-2 flex gap-2">
              <li>
                <Link to={"https://wa.me/+971508153735"} target="_blank">
                  <FaSquareWhatsapp className="h-8 w-8" />
                </Link>
              </li>
              <li>
                <Link
                  to={"https://www.instagram.com/by_rhona/"}
                  target="_blank"
                >
                  <FaInstagramSquare className="h-8 w-8" />
                </Link>
              </li>

              <li>
                <Link
                  to={"https://www.tiktok.com/@by_rhona_?_t=8pSe85jw9hY&_r=1"}
                  target="_blank"
                >
                  <AiFillTikTok className="h-8 w-8" />
                </Link>
              </li>
              <li>
                <Link to={"/"} target="_blank">
                  <FaFacebookSquare className="h-8 w-8" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:hidden flex flex-col w-full space-y-8">
          <div className="grid grid-cols-2 gap-10">
            <div className="">
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                Useful Links
              </p>
              <ul className="flex flex-col justify-center gap-2 text-sm">
                <li>
                  <Link to={"/"}>
                    <p className=" font-semibold capitalize text-gray-700">
                      {t("home")}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to={"/about-us"}>
                    <p className=" font-semibold capitalize text-gray-700">
                      {t("about_us")}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to={"/contacts"}>
                    <p className=" font-semibold capitalize text-gray-700">
                      {t("contact_us")}
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                {t("shop")}
              </p>
              <ul className="flex flex-col justify-center gap-2 text-sm">
                <li>
                  <Link to={`/products`}>
                    <p className=" font-semibold capitalize text-gray-700">
                      {t("all_products")}
                    </p>
                  </Link>
                </li>
                {departmentsInfo?.slice(0, 4).map(department =>
                  department.categories.slice(0, 3).map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/products?category=${category.name}&categoryId=${category._id}`}
                        reloadDocument
                      >
                        <p className=" font-semibold capitalize text-gray-700">
                          {selectedLanguage === "en"
                            ? category.name
                            : selectedLanguage === "fr"
                            ? category.nameFr
                            : category.nameAr}
                        </p>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                {t("get_in_touch")}
              </p>

              <ul className="flex flex-col justify-center gap-2 text-sm">
                <li>
                  <p className="font-semibold">
                    {contactUsInfo?.content.email}
                  </p>
                </li>

                <li>
                  <p className="font-semibold">
                    {contactUsInfo?.content.phoneNumber}
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                {t("social_media")}
              </p>

              <ul className="mb-2 flex gap-2">
                <li>
                  <Link
                    to={`https://wa.me/${contactUsInfo?.content.whatsApp}`}
                    target="_blank"
                  >
                    <FaSquareWhatsapp className="h-8 w-8" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={contactUsInfo?.content.instagram ?? "/"}
                    target="_blank"
                  >
                    <FaInstagramSquare className="h-8 w-8" />
                  </Link>
                </li>

                <li>
                  <Link
                    to={contactUsInfo?.content.tiktok ?? "/"}
                    target="_blank"
                  >
                    <AiFillTikTok className="h-8 w-8" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={contactUsInfo?.content.faceBook ?? "/"}
                    target="_blank"
                  >
                    <FaFacebookSquare className="h-8 w-8" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-2 text-center text-sm md:text-base">
        <div>
          Copyright{" "}
          <strong>
            <span>By Rhona</span>
          </strong>{" "}
          Company. All Rights Reserved
        </div>
        <div className=" text-sm">
          Powered By
          <a
            href="https://siimedia.net/"
            className=" ml-1 text-secondary font-semibold"
          >
            Sii Media
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
