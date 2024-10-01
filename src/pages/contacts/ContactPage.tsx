import { useGetContactUsInfo } from "../../api/contact-us/queries";
import { motion } from "framer-motion";
import ContactInfoSection from "../../components/pages/contacts/ContactInfoSection";
import ContactForm from "../../components/pages/contacts/ContactForm";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { data: contactUsInfo, isError, isLoading } = useGetContactUsInfo();
  const { t } = useTranslation();

  if (isLoading) return <div>Loading.....</div>;
  if (isError) return <div>Error !!</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full h-20 md:h-32 lg:h-32 bg-primary">
        <h1 className="text-2xl lg:text-5xl font-header text-white text-center  my-auto mx-auto w-full">
          {t("contact_us")}
        </h1>
      </div>
      <div className="grid grid-flow-row md:grid-cols-2  mx-auto md:mx-14">
        <ContactInfoSection
          email={contactUsInfo?.content.email}
          facebook={contactUsInfo?.content.faceBook}
          instagram={contactUsInfo?.content.instagram}
          location={contactUsInfo?.content.location}
          mobile={contactUsInfo?.content.mobileOne}
          phone={contactUsInfo?.content.phoneNumber}
          whatsApp={contactUsInfo?.content.whatsApp}
          tiktok={contactUsInfo?.content.tiktok}
        />
        <ContactForm />
      </div>
    </motion.div>
  );
};

export default ContactPage;
