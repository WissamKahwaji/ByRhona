import { useState } from "react";
import { AiOutlineCloseSquare, AiOutlineMenu } from "react-icons/ai";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaMobileScreenButton, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const socialMediaIcons = [
    { icon: <FaWhatsapp className="text-gray-800" />, link: "/" },
    { icon: <FaInstagram className="text-gray-800" />, link: "/" },
    { icon: <FaFacebook className="text-gray-800" />, link: "/" },
    { icon: <FaTiktok className="text-gray-800" />, link: "/" },
  ];

  const navItems = [
    { title: "Home", path: "/" },
    {
      title: "Shop",
      path: "/products",
      hasDropdown: true,
      dropdownItems: [
        {
          title: "All Products",
          path: "/products",
        },
        {
          title: "Anklets",
          path: "/products",
        },
        {
          title: "Belly Chains",
          path: "/products",
        },
      ],
    },
    { title: "about us", path: "/about-us" },
    { title: "contact us", path: "/contact-us" },
  ];

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <header className="fixed left-0 top-0 z-[1001] w-screen border-b border bg-white  shadow-sm font-header">
      <nav className="hidden md:flex md:flex-row md:items-center md:justify-between md:bg-foreground md:py-2 md:px-8  md:h-full">
        <div className="flex flex-row space-x-3">
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
            <span className="ml-2  ">+971508153735</span>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          {socialMediaIcons.map((socialMedia, index) => (
            <Link
              key={index}
              to={socialMedia.link ?? ""}
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
        <div className="flex flex-row space-x-10 justify-start items-center capitalize ">
          {navItems.map((item, index) => (
            <p
              className={`cursor-pointer font-semibold ${
                item.path === currentPath ? "text-[#906d5b]" : "text-[#906d5b]"
              } hover:text-secondary duration-300 ease-in-out`}
              key={index}
            >
              {item.title}
            </p>
          ))}
        </div>
        <HiOutlineShoppingCart className="text-2xl" />
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
        <button
          onClick={toggleDrawer}
          className="md:hidden  text-secondary hover:text-hoverColor transition duration-300 text-2xl focus:outline-none"
        >
          <AiOutlineMenu />
        </button>
        {showDrawer && (
          <div className="md:hidden fixed inset-0 bg-transparent bg-opacity-90 flex flex-row w-full backdrop-filter backdrop-blur-sm">
            <div className=" bg-foreground bg-opacity-80 z-[1002] transition  duration-300 transform translate-x-0 w-[75%]">
              <div className="flex flex-col items-start mx-2 space-y-4 py-8">
                {navItems.map((item, index) => (
                  <div key={index} className="w-full ">
                    <Link
                      onClick={toggleDrawer}
                      to={item.path}
                      className={`block font-header border-b-2 w-full border-b-secondary px-4 py-2 text-gray-800 hover:bg-hoverColor uppercase ${
                        item.path === currentPath ? "bg-hoverColor/20" : ""
                      }`}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
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
                <div className="flex flex-row space-x-4">
                  {socialMediaIcons.map((socialMedia, index) => (
                    <Link
                      key={index}
                      to={socialMedia.link ?? ""}
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
