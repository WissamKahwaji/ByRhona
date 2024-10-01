import { useTranslation } from "react-i18next";
import { useGetAboutUsInfoQuery } from "../../api/about-us/queries";
import AboutUsInfo from "../../components/items/aboutUsInfo";
import LoadingPage from "../loading-page";

const AboutUsPage = () => {
  const { data: aboutUsInfo, isLoading, isError } = useGetAboutUsInfoQuery();
  const { t } = useTranslation();
  if (isLoading) return <LoadingPage />;
  if (isError) return <div>Error !!!</div>;

  return (
    <div className="py-12 sm:py-16 md:py-24">
      <h2 className="mb-2  scroll-m-20 text-center text-3xl font-semibold uppercase tracking-tight first:mt-0 sm:mb-4 md:mb-8">
        {t("about_us")}
      </h2>

      <AboutUsInfo aboutUsContent={aboutUsInfo?.content} />
    </div>
  );
};

export default AboutUsPage;
