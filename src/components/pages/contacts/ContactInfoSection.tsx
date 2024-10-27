import { useTranslation } from "react-i18next";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPhone,
  FaTiktok,
  FaWhatsappSquare,
} from "react-icons/fa";
import { FaSquareSnapchat } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

type ContactInfoSectionProps = {
  location: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  mobile: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  whatsApp: string | undefined;
  tiktok: string | undefined;
  snapChat: string | undefined;
};

const ContactInfoSection = (props: ContactInfoSectionProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 bg-gray-background p-5 md:p-14 lg:p-20  bg-background">
      <div>
        <p className="mb-6 text-2xl font-semibold font-header capitalize text-hoverColor">
          {t("locations")}
        </p>
        <p className="font-semibold font-body text-gray-400 text-sm lg:text-lg  ">
          {props.location}
        </p>
      </div>
      <div>
        <p className="mb-6 text-2xl font-semibold font-header capitalize text-hoverColor">
          {t("contact_info")}
        </p>
        <ul className="flex flex-col justify-center gap-4 text-subTitle">
          <li>
            <p
              className="flex items-center gap-2  font-semibold cursor-pointer w-max"
              style={{ direction: "ltr" }}
              onClick={() => {
                window.location.href = `mailto:${props.email}`;
              }}
            >
              <MdEmail />
              <span>{props.email}</span>
            </p>
          </li>

          <li>
            <p
              className="flex items-center gap-2 font-semibold cursor-pointer w-max"
              style={{ direction: "ltr" }}
              onClick={() => {
                window.location.href = `tel:${props.phone}`;
              }}
            >
              <FaPhone />
              <span>{props.phone}</span>
            </p>
          </li>
        </ul>
      </div>
      <div>
        <p className="mb-6 text-2xl font-semibold font-header capitalize text-hoverColor">
          {t("social_media")}
        </p>
        <ul className="mb-2 flex gap-2">
          <li>
            <Link to={`https://wa.me/${props.whatsApp}`} target="_blank">
              <FaWhatsappSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
            </Link>
          </li>

          <li>
            <Link to={props.instagram ?? "/"} target="_blank">
              <FaInstagramSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
            </Link>
          </li>
          <li>
            <Link to={props.tiktok ?? "/"} target="_blank">
              <FaTiktok className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
            </Link>
          </li>
          <li>
            <Link to={props.facebook ?? "/"} target="_blank">
              <FaFacebookSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
            </Link>
          </li>
          <li>
            <Link to={props.snapChat ?? "/"} target="_blank">
              <FaSquareSnapchat className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfoSection;
