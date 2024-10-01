import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseSquare, AiOutlineMenu } from "react-icons/ai";
import {
  FaChevronDown,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  FaChevronRight,
  FaMobileScreenButton,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import LanguageButton from "../../components/ui/LanguageButton";
import { useGetDepartmentsInfoQuery } from "../../api/departments/queries";
import { DepartmentModel } from "../../api/departments/type";
import { CategoryModel } from "../../api/categories/type";
import { useAuth } from "../../context/AuthContext";
import { IoMdLogOut, IoMdPersonAdd } from "react-icons/io";
import BasketMenu from "../../components/items/basketMenu";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: departmentsInfo } = useGetDepartmentsInfoQuery();
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const socialMediaIcons = [
    {
      icon: <FaWhatsapp className="text-gray-800" />,
      link: `https://wa.me/+971508153735`,
    },
    {
      icon: <FaInstagram className="text-gray-800" />,
      link: "https://www.instagram.com/by_rhona/",
    },
    {
      icon: <FaTiktok className="text-gray-800" />,
      link: "https://www.tiktok.com/@by_rhona_?_t=8pSe85jw9hY&_r=1",
    },
    { icon: <FaFacebook className="text-gray-800" />, link: "/" },
  ];

  const navItems = [
    { title: "home", path: "/" },
    {
      title: "shop",
      path: "/products",
      hasMenu: true,
    },
    { title: "about_us", path: "/about-us" },
    { title: "contact_us", path: "/contacts" },
  ];

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [openDepartmentId, setOpenDepartmentId] = useState<string | null>(null);

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
    setOpenDepartmentId(null); // Close all submenus when toggling the main dropdown
  };

  const toggleDepartmentSubmenu = (departmentId: string) => {
    if (openDepartmentId === departmentId) {
      console.log("close");
      setOpenDepartmentId(null); // Close if the same department is clicked again
    } else {
      console.log("open");
      setOpenDepartmentId(departmentId); // Open the clicked department's submenu
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown and submenu if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsShopDropdownOpen(false);
      setOpenDepartmentId(null);
    }
  };

  // Add event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="fixed left-0 top-0 z-[1001] w-screen border-b border bg-white  shadow-sm font-header"
      style={{ direction: "ltr" }}
    >
      <nav className="hidden md:flex md:flex-row md:items-center md:justify-between md:bg-foreground md:py-2 md:px-8  md:h-full">
        <div className="flex flex-row gap-x-3">
          <div
            className="flex flex-row items-center  text-black cursor-pointer"
            onClick={() => {
              window.location.href = `mailto:info@byrhona.com`;
            }}
          >
            <FaEnvelope className="text-secondary text-lg" />
            <span className="ml-2">info@byrhona.com</span>
          </div>
          <div
            className="flex flex-row items-center  text-black cursor-pointer"
            onClick={() => {
              window.location.href = `tel:+971508153735`;
            }}
          >
            <FaMobileScreenButton className="text-secondary text-lg" />
            <span className="ml-2  ">+971 50 815 3735</span>
          </div>
        </div>
        <div className="flex flex-row gap-x-4">
          {socialMediaIcons.map((socialMedia, index) => (
            <Link
              key={index}
              to={socialMedia.link ?? ""}
              target="_blank"
              className="flex items-center text-white hover:text-hoverColor transition duration-300"
            >
              {socialMedia.icon}
            </Link>
          ))}
          {/* <LanguageButton /> */}
        </div>
      </nav>
      <nav className="hidden md:flex items-center justify-between w-full px-20 py-1">
        <Link to={"/"} className="">
          <div className="flex justify-start items-center">
            <img
              src="https://i.imgur.com/GhSSHdx.png"
              alt=""
              className="w-20 h-auto"
            />
          </div>
        </Link>
        <div className="flex flex-row gap-x-10 justify-start items-center capitalize ">
          {navItems.map((item, index) =>
            item.hasMenu ? (
              <div className="relative" ref={dropdownRef}>
                <p
                  onClick={toggleShopDropdown}
                  className={`cursor-pointer font-semibold flex items-center ${
                    currentPath === "/products"
                      ? "text-[#906d5b]"
                      : "text-[#906d5b]"
                  } hover:text-secondary duration-300 ease-in-out`}
                >
                  {t(item.title)} <FaChevronDown className="ml-2" />
                </p>

                {/* Dropdown menu */}
                {isShopDropdownOpen && departmentsInfo && (
                  <div className="absolute left-0 top-full bg-white shadow-lg border mt-1 w-64 py-2 z-50">
                    <Link
                      to={"/products"}
                      onClick={() => {
                        setIsShopDropdownOpen(false);
                        setOpenDepartmentId(null);
                      }}
                    >
                      <p className="px-4 py-2 text-gray-800 hover:bg-hoverColor cursor-pointer flex items-center justify-between">
                        {t("all_products")}
                      </p>
                    </Link>
                    {departmentsInfo.map((department: DepartmentModel) => (
                      <div key={department._id} className="relative group">
                        {/* Department toggle */}
                        <p
                          onClick={() =>
                            toggleDepartmentSubmenu(department._id)
                          }
                          className="px-4 py-2 text-gray-800 hover:bg-hoverColor cursor-pointer flex items-center justify-between"
                        >
                          {selectedLang === "en-GB"
                            ? department.name
                            : selectedLang === "fr"
                            ? department.nameFr
                            : department.nameAr}
                          <FaChevronRight className="ml-2" />
                        </p>

                        {/* Submenu for categories positioned to the right */}
                        {openDepartmentId === department._id &&
                          department.categories.length > 0 && (
                            <div className="absolute left-full top-0 bg-white shadow-lg border mt-0 py-2 w-48 z-50">
                              {department.categories.map(
                                (category: CategoryModel) => (
                                  <Link
                                    key={category._id}
                                    to={`/products?category=${category.name}&categoryId=${category._id}`}
                                    className="block px-4 py-2 text-gray-800 hover:bg-hoverColor"
                                    reloadDocument
                                  >
                                    {selectedLang === "en-GB"
                                      ? category.name
                                      : selectedLang === "fr"
                                      ? category.nameFr
                                      : category.nameAr}
                                  </Link>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={index} to={item.path}>
                <p
                  className={`cursor-pointer font-semibold ${
                    item.path === currentPath
                      ? "text-[#906d5b]"
                      : "text-[#906d5b]"
                  } hover:text-secondary duration-300 ease-in-out`}
                >
                  {t(item.title)}
                </p>
              </Link>
            )
          )}
          {isAuthenticated && (
            <Link to={`orders/user/${userId}`}>
              <p
                className={`cursor-pointer font-semibold text-[#906d5b] hover:text-secondary duration-300 ease-in-out`}
              >
                {t("orders")}
              </p>
            </Link>
          )}
        </div>
        <div className="flex flex-row gap-x-3">
          <LanguageButton />
          <BasketMenu />
          {!isAuthenticated ? (
            <Link to={`/signin`}>
              <IoMdPersonAdd className="text-2xl" />
            </Link>
          ) : (
            <IoMdLogOut
              className="text-2xl cursor-pointer"
              onClick={() => {
                localStorage.clear();
                window.location.replace("/signin");
              }}
            />
          )}
        </div>
      </nav>
      <nav className="flex md:hidden items-center justify-between w-full px-3 py-1">
        <Link to={"/"} className="">
          <div className="flex justify-start items-center">
            <img
              src="https://i.imgur.com/GhSSHdx.png"
              alt=""
              className="w-14 h-auto"
            />
          </div>
        </Link>
        <div className="flex gap-x-4 items-center justify-start">
          <BasketMenu />
          {!isAuthenticated ? (
            <Link to={`/signin`}>
              <IoMdPersonAdd className="text-2xl" />
            </Link>
          ) : (
            <IoMdLogOut
              className="text-2xl cursor-pointer"
              onClick={() => {
                localStorage.clear();
                window.location.replace("/signin");
              }}
            />
          )}
          <button
            onClick={toggleDrawer}
            className="md:hidden  text-secondary hover:text-hoverColor transition duration-300 text-2xl focus:outline-none"
          >
            <AiOutlineMenu />
          </button>
        </div>
        {showDrawer && (
          <div className="md:hidden fixed inset-0 bg-transparent bg-opacity-90 flex flex-row w-full backdrop-filter backdrop-blur-sm">
            <div className=" bg-foreground bg-opacity-80 z-[1002] transition  duration-300 transform translate-x-0 w-[65%]">
              <div className="flex flex-col items-start mx-2 space-y-4 py-8">
                {navItems.map((item, index) =>
                  item.hasMenu ? (
                    <div className="w-full" ref={dropdownRef}>
                      <p
                        onClick={toggleShopDropdown}
                        className={`flex justify-start items-center font-header border-b-2 w-full border-b-secondary px-4 py-2 text-gray-800 hover:bg-hoverColor uppercase ${
                          item.path === currentPath ? "bg-hoverColor/20" : ""
                        }`}
                      >
                        {t(item.title)} <FaChevronDown className="ml-2" />
                      </p>

                      {isShopDropdownOpen && departmentsInfo && (
                        <div className="mt-2 pl-4">
                          <Link to={"/products"}>
                            <p className="py-2 text-gray-800 text-sm hover:bg-hoverColor cursor-pointer flex items-center justify-start">
                              {t("all_products")}
                            </p>
                          </Link>
                          {departmentsInfo.map(
                            (department: DepartmentModel) => (
                              <div key={department._id} className="relative">
                                <p
                                  onClick={() =>
                                    toggleDepartmentSubmenu(department._id)
                                  }
                                  className="py-2 text-gray-800 text-sm hover:bg-hoverColor cursor-pointer flex items-center justify-start"
                                >
                                  {selectedLang === "en-GB"
                                    ? department.name
                                    : selectedLang === "fr"
                                    ? department.nameFr
                                    : department.nameAr}
                                  <FaChevronRight className="ml-2" />
                                </p>

                                {openDepartmentId === department._id &&
                                  department.categories.length > 0 && (
                                    <div className="pl-4">
                                      {department.categories.map(
                                        (category: CategoryModel) => (
                                          <Link
                                            key={category._id}
                                            to={`/products/${department._id}/${category._id}`}
                                            // onClick={toggleMobileDrawer}
                                            className="block py-2 text-gray-800 hover:bg-hoverColor text-sm "
                                          >
                                            {selectedLang === "en-GB"
                                              ? category.name
                                              : selectedLang === "fr"
                                              ? category.nameFr
                                              : category.nameAr}
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div key={index} className="w-full ">
                      <Link
                        onClick={toggleDrawer}
                        to={item.path}
                        className={`block font-header border-b-2 w-full border-b-secondary px-4 py-2 text-gray-800 hover:bg-hoverColor uppercase ${
                          item.path === currentPath ? "bg-hoverColor/20" : ""
                        }`}
                      >
                        {t(item.title)}
                      </Link>
                    </div>
                  )
                )}
                {isAuthenticated && (
                  <div className="w-full ">
                    <Link
                      onClick={toggleDrawer}
                      to={`orders/user/${userId}`}
                      className={`block font-header border-b-2 w-full border-b-secondary px-4 py-2 text-gray-800 hover:bg-hoverColor uppercase `}
                    >
                      {t("orders")}
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-4 px-4">
                <div
                  className="flex flex-row items-center  text-white cursor-pointer"
                  onClick={() => {
                    window.location.href = `mailto:info@byrhona.com`;
                  }}
                >
                  <FaEnvelope />
                  <span className="ml-2 text-lg">info@byrhona.com</span>
                </div>
                <div
                  className="flex flex-row items-center  text-white cursor-pointer"
                  onClick={() => {
                    window.location.href = `tel:+971508153735`;
                  }}
                >
                  <FaPhoneAlt />
                  <span className="ml-2 text-lg">+971 508 153 735</span>
                </div>
                <div className="flex flex-row gap-x-4">
                  {socialMediaIcons.map((socialMedia, index) => (
                    <Link
                      key={index}
                      to={socialMedia.link ?? ""}
                      target="_blank"
                      className="flex items-center text-white hover:text-hoverColor transition duration-300"
                    >
                      {socialMedia.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-[60px] w-[15%] bg-transparent flex justify-center items-center ml-6 mt-3">
              <button
                onClick={toggleDrawer}
                className="text-primary text-lg focus:outline-none"
              >
                <AiOutlineCloseSquare className="text-6xl text-hoverColor" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
