import AboutUsInfo from "../../components/items/aboutUsInfo";
import CollectionsCategory from "../../components/pages/home/CollectionsCategory";
import FeaturedProducts from "../../components/pages/home/FeaturedProducts";
import HomeSlider from "../../components/pages/home/HomeSlider";
import OffersSection from "../../components/pages/home/OffersSection";
import ProductSection from "../../components/pages/home/ProductSection";

const HomePage = () => {
  const content = [
    {
      _id: "1",
      img: "https://i.imgur.com/pf8JSTW.jpeg",
      title: "Our Vision",
      text: "Here’s a summary of who are the 3 generation of •R•\nSenior •R• is REEM who loves to always be in, up to date in everything and doesn’t give up until she achieves her goals! She is a grandma for 5 kids.\nJunior •R• is RAWYA (Rhona’s mom) who is an Economics graduate, has an architectural background, loves all types of design in life and she’s a mom of 3 kids!",
    },
    {
      _id: "2",
      img: "https://i.imgur.com/ezM7EGK.jpeg",
      title: "Our Mission",
      text: "Youngest •R• is RHONA, who started  @by_rhona & @By_Rhona_Home_Touch with her creativity, passion, ambition and kindness! She was in grade 6 and has loads of work for school!\n Everything is made with LOVE by the 3 generation of •R• who always believe in ✨GIVING",
    },
  ];
  return (
    <div className="text-black">
      <HomeSlider />
      <section className="py-12   bg-foreground/20 mt-3">
        <h2 className="mb-2  scroll-m-20 text-center text-3xl font-semibold uppercase tracking-tight first:mt-0 sm:mb-4 md:mb-8">
          About Us
        </h2>
        <AboutUsInfo aboutUsContent={content} />
      </section>
      <ProductSection />
      <CollectionsCategory />
      <OffersSection />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
