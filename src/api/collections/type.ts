import { Product } from "../products/type";

export type CollectionModel = {
  _id: string;
  image: string;
  name: string;
  nameFr: string;
  nameAr: string;
  products?: Product[];
};
