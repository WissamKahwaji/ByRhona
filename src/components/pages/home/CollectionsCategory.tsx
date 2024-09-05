import { Link } from "react-router-dom";
import { COLLECTION_CAROUSAL_RESPONSIVE } from "../../../constants";
import Carousel from "react-multi-carousel";

const CollectionsCategory = () => {
  const productTypes = [
    {
      _id: "1",
      img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTfLB8KLXMnpG5LC1r5neXNeQOdg6D6yy8Vb46TGquinwXTd9EeBVfTR49MxjL_j5VxEdt2cEk3B0XUUl9QO5boWpsgpBYe6YHlJP5kzK_JD6jkQU_81v1CXw&usqp=CAc",
      name: "Collection 1",
    },
    { _id: "2", img: "https://i.imgur.com/pf8JSTW.jpeg", name: "Collection 2" },
    { _id: "3", img: "https://i.imgur.com/ezM7EGK.jpeg", name: "Collection 3" },
    { _id: "4", img: "https://i.imgur.com/7oT8DPZ.jpeg", name: "Collection 4" },
    { _id: "5", img: "https://i.imgur.com/C12UBOe.jpeg", name: "Collection 5" },
    { _id: "6", img: "https://i.imgur.com/PLtYHxX.jpeg", name: "Collection 6" },
    { _id: "7", img: "https://i.imgur.com/6wgm7IO.jpeg", name: "Collection 7" },
  ];
  return (
    <section className=" flex flex-col gap-8 bg-gray-background py-12 md:gap-16 font-header">
      <div>
        <h2 className="sm:2xl  scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">
          Collections category
        </h2>
      </div>
      {/* <div className="flex flex-wrap items-center justify-center gap-4 "> */}
      {productTypes && (
        <Carousel
          infinite
          autoPlay
          removeArrowOnDeviceType={"xs"}
          responsive={COLLECTION_CAROUSAL_RESPONSIVE}
        >
          {productTypes?.map(productType => (
            <div className=" px-3 sm:px-6 md:px-9 lg:px-12  ">
              <Link
                to={`/products?type_id=${productType._id}&type=${productType.name}`}
              >
                <div
                  key={productType._id}
                  className="group flex  flex-col items-center gap-8 overflow-hidden  "
                >
                  <div className=" h-full  w-full overflow-hidden  ">
                    <img
                      className="aspect-square h-full w-full object-cover transition-transform group-hover:rotate-1 group-hover:scale-105"
                      src={productType.img}
                      alt={productType.name}
                    />
                  </div>
                  <p className="text-sm font-semibold uppercase md:text-lg text-secondary">
                    {productType.name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      )}
      {/* </div> */}
    </section>
  );
};

export default CollectionsCategory;
