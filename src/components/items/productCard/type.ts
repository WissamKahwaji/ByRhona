import { Product } from "../../../api/products/type";

export type ProductCardProps = Product & { isCarouselItem: boolean };
