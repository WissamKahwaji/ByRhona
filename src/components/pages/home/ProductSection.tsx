import Carousel from "react-multi-carousel";
import { CAROUSAL_RESPONSIVE } from "../../../constants";
import ProductCard from "../../items/productCard";
import { Product } from "../../../api/products/type";

const ProductSection = () => {
  const products: Product[] = [
    {
      deepDetails: [{ weight: "1", price: "200" }],
      _id: "1",
      img: "https://i.imgur.com/ATZS8Mo.png",
      title: "Fairuz and Jade necklace",
      desc: "Desc of Product 1",
      priceKg: 1000,
    },
    {
      deepDetails: [{ weight: "1", price: "200" }],
      _id: "2",
      img: "https://i.imgur.com/PoyDOLs.png",
      title: "Bracelets of blue turquoise",
      desc: "Desc of Product 2",
      priceKg: 2000,
    },
    {
      deepDetails: [{ weight: "1", price: "200" }],
      _id: "3",
      img: "https://i.imgur.com/HNbPyAw.png",
      title: "Necklace in apple color",
      desc: "Desc of Product 3",
      priceKg: 3000,
    },
    {
      deepDetails: [{ weight: "1", price: "200" }],
      _id: "4",
      img: "https://i.imgur.com/4cfUpKf.png",
      title: "A necklace of pure turquoise",
      desc: "Desc of Product 4",
      priceKg: 4000,
    },
  ];
  return (
    <section className="flex flex-col gap-16 bg-gray-background py-12">
      <div>
        <h2 className="sm:2xl  scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">
          Best seller items
        </h2>
      </div>
      <div className="m-auto w-full lg:w-3/4 ">
        {products && (
          <Carousel
            infinite
            autoPlay
            removeArrowOnDeviceType={"xs"}
            responsive={CAROUSAL_RESPONSIVE}
          >
            {products?.map(product => (
              <ProductCard
                key={product._id}
                {...{ ...product, isCarouselItem: true }}
              />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
