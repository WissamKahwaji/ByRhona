import { AiFillTikTok } from "react-icons/ai";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const productTypes = [
    { _id: "1", name: "Accessories" },
    { _id: "1", name: "Home Touch" },
  ];
  return (
    <div className="flex w-full flex-col font-header">
      <div className="flex flex-col w-full justify-between items-center gap-8 border-t border-foreground bg-foreground/30 px-6 py-8 shadow-negative md:flex-col md:gap-10  md:px-12  md:py-6 ">
        <div>
          <Link to={"/"} className="">
            <div className="flex flex-row  ">
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
              Useful Links
            </p>
            <ul className="flex flex-col justify-center gap-2 text-sm">
              <li>
                <Link to={"/"}>
                  <p className=" font-semibold capitalize text-gray-700">
                    home
                  </p>
                </Link>
              </li>
              <li>
                <Link to={"/about-us"}>
                  <p className=" font-semibold capitalize text-gray-700">
                    about us
                  </p>
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"}>
                  <p className=" font-semibold capitalize text-gray-700">
                    contact us
                  </p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="mb-3 text-xl font-semibold capitalize text-secondary">
              shop
            </p>
            <ul className="flex flex-col justify-center gap-2 text-sm">
              {productTypes?.slice(0, 4).map(productType => (
                <li key={productType._id}>
                  <Link to={`/products/${productType._id}`}>
                    <p className=" font-semibold capitalize text-gray-700">
                      {productType.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xl font-semibold capitalize text-secondary">
              Get In Touch
            </p>

            <ul className="flex flex-col justify-center gap-2 text-sm">
              <li>
                <p className="font-semibold">info@byrhona.com</p>
              </li>

              <li>
                <p className="font-semibold">+971 5081 537 35 </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xl font-semibold capitalize text-secondary">
              Social Media
            </p>

            <ul className="mb-2 flex gap-2">
              <li>
                <Link to={"/"} target="_blank">
                  <FaFacebookSquare className="h-8 w-8" />
                </Link>
              </li>
              <li>
                <Link to={"/"} target="_blank">
                  <FaInstagramSquare className="h-8 w-8" />
                </Link>
              </li>

              <li>
                <Link to={"/"} target="_blank">
                  <FaSquareThreads className="h-8 w-8" />
                </Link>
              </li>
              <li>
                <Link to={"/"} target="_blank">
                  <AiFillTikTok className="h-8 w-8" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <iframe
              title="ByRhona"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.68281993904!2d55.55715258647901!3d25.076280448422043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2z2K_YqNmK!5e0!3m2!1sar!2sae!4v1725454725455!5m2!1sar!2sae"
              width="600"
              height="450"
              loading="lazy"
              className="w-[450px] h-[350px]"
            ></iframe>
            <div className="pt-4">
              <p className="mb-2 text-xl font-semibold capitalize text-gray-400">
                locations
              </p>
              <p className="font-semibold  ">United Arab Emirates, Dubai</p>
            </div>
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
                      home
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to={"/about-us"}>
                    <p className=" font-semibold capitalize text-gray-700">
                      about us
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to={"/contact-us"}>
                    <p className=" font-semibold capitalize text-gray-700">
                      contact us
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                shop
              </p>
              <ul className="flex flex-col justify-center gap-2 text-sm">
                {productTypes?.slice(0, 4).map(productType => (
                  <li key={productType._id}>
                    <Link to={`/products/${productType._id}`}>
                      <p className=" font-semibold capitalize text-gray-700">
                        {productType.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                Get In Touch
              </p>

              <ul className="flex flex-col justify-center gap-2 text-sm">
                <li>
                  <p className="font-semibold">info@byrhona.com</p>
                </li>

                <li>
                  <p className="font-semibold">+971 5081 537 35 </p>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                Social Media
              </p>

              <ul className="mb-2 flex gap-2">
                <li>
                  <Link to={"/"} target="_blank">
                    <FaFacebookSquare className="h-8 w-8" />
                  </Link>
                </li>
                <li>
                  <Link to={"/"} target="_blank">
                    <FaInstagramSquare className="h-8 w-8" />
                  </Link>
                </li>

                <li>
                  <Link to={"/"} target="_blank">
                    <FaSquareThreads className="h-8 w-8" />
                  </Link>
                </li>
                <li>
                  <Link to={"/"} target="_blank">
                    <AiFillTikTok className="h-8 w-8" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <iframe
              title="ByRhona"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.68281993904!2d55.55715258647901!3d25.076280448422043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2z2K_YqNmK!5e0!3m2!1sar!2sae!4v1725454725455!5m2!1sar!2sae"
              width="600"
              height="450"
              loading="lazy"
              className="w-full h-[250px]"
            ></iframe>
            <div className="pt-4">
              <p className="mb-2 text-xl font-semibold capitalize text-gray-400">
                locations
              </p>
              <p className="font-semibold  ">United Arab Emirates, Dubai</p>
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
