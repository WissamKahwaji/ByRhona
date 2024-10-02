import { motion } from "framer-motion";
import { AboutUsContentModel } from "./type";
import { useTranslation } from "react-i18next";

const AboutUsInfo = ({ aboutUsContent }: AboutUsContentModel) => {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  return (
    <section className="flex flex-col items-center justify-center gap-16 py-12">
      {aboutUsContent?.map((contactUs, index) => (
        <motion.div
          key={contactUs._id}
          className={`flex flex-col ${
            index % 2 == 0 ? "md:flex-row-reverse" : ""
          } items-center justify-center gap-4 px-4 md:flex-row md:items-start md:gap-16`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="md:h-[400px] md:w-[400px] h-[400px] w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              className="h-full w-full object-cover"
              src={contactUs.img}
              alt={contactUs.title}
            />
          </motion.div>

          <motion.div
            className="md:max-w-md space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          >
            <p className="font-bold font-header text-primary text-2xl">
              {selectedLanguage === "en"
                ? contactUs.title
                : selectedLanguage === "fr"
                ? contactUs.titleFr
                : contactUs.titleAr}
            </p>
            <p
              style={{
                direction: "rtl",
                textAlign: "justify",
                textAlignLast: `${
                  selectedLanguage === "en" || selectedLanguage === "fr"
                    ? "left"
                    : "right"
                }`,
              }}
              className="text-start text-primary first-letter:pl-2 whitespace-pre-wrap"
            >
              {selectedLanguage === "en"
                ? contactUs.text
                : selectedLanguage === "fr"
                ? contactUs.textFr
                : contactUs.textAr}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
};

export default AboutUsInfo;
