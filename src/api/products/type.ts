import { CategoryModel } from "../categories/type";

export type Product = {
  _id: string;
  img: string;
  imgs?: string[];
  videos?: string[];
  title: string;
  titleFr: string;
  titleAr: string;
  category: CategoryModel;
  desc: string;
  descFr: string;
  descAr: string;
  price: {
    priceAED: number;
    priceUSD: number;
  };
};
