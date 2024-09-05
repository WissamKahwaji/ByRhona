import { Link } from "react-router-dom";
import { ProductCardProps } from "./type";

const ProductCard = (props: ProductCardProps) => {
  const { _id, img, title, desc, priceKg } = props;

  //   const navigate = useNavigate();
  return (
    <div className="flex  flex-col gap-3 px-4 sm:gap-5 font-header">
      <Link to={`/product/${_id}`}>
        <div className="  group flex w-full  flex-col items-center gap-4   ">
          <div className="  relative w-full ">
            <div className="absolute left-0 top-0 flex h-0 w-full items-center justify-center bg-foreground/50  transition-all duration-500 group-hover:h-full  ">
              <p className=" hidden w-full bg-background p-2 text-center opacity-100 group-hover:block text-sm font-body">
                {" "}
                {desc}
              </p>
            </div>
            <img
              className="aspect-square h-full w-full object-cover"
              src={img}
              alt={title}
            />
          </div>

          <p className=" w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-semibold uppercase md:text-base text-primary">
            {title}
          </p>

          <p className=" text-sm text-muted-foreground md:text-base lg:text-base">
            <span className="mr-1">{priceKg}</span>
            <span className="uppercase">aed</span>
          </p>
        </div>
      </Link>
      <button className="rounded w-full px-2 py-1 bg-foreground font-body font-semibold capitalize hover:bg-primary hover:text-white duration-300 transform ease-in-out">
        add to cart
      </button>
    </div>
  );
};

export default ProductCard;
