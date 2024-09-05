export type DeepDetails = {
  price: string;
  weight: string;
};
export type Product = {
  deepDetails: DeepDetails[];
  _id: string;
  img: string;
  title: string;
  desc: string;
  priceKg: number;
  __v?: number;
};
