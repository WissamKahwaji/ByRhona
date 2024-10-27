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
  isOffer?: boolean;
  priceAfterOffer?: {
    priceAED: number;
    priceUSD: number;
  };

  productQuantity?: number;
  notifyUsers?: string[];
};

export type IntentData = {
  amount: number;
};
export type PaymentConfigRes = {
  publicKey: string;
};
export type IntentRes = {
  clientSecret: string;
};

export type FavoriteItemsModel = {
  productId: string;
  title: string;
  titleFr: string;
  titleAr: string;
  img: string;
  price: {
    priceAED: number;
    priceUSD: number;
  };
  category: string;
  categoryAr: string;
  categoryFr: string;
  desc: string;
  descFr: string;
  descAr: string;
};
