export type DeliveryDetailsInputModel = {
  fullName: string;
  email: string;
  mobileNumber: string;
  country: string;
  city: string;
  street?: string;
  building?: string;
  floorNumber?: string;
  unitNumber?: string;
  note?: string;
};

export type UserOrder = {
  cartItems: CartItem[];
  cartItemsTotalPrice: number;
  country: string;
  city: string;
  email: string;
  createdAt: string;
  paymentMethod: "cash" | "card";
  updatedAt: string;
  userBuilding: string;
  userId: string;
  userMobileNumber: string;
  userName: string;
  userNote: string;
  userStreet: string;

  _id: string;
};
export type CartItem = {
  id?: string;
  img: string;
  price: {
    priceAED: number;
    priceUSD: number;
  };
  quantity: number;
  title: string;
  _id?: string;
};

export type PaymentOrdersValue = {
  userId: string;
  userName: string;
  email: string;
  userStreet: string;
  userBuilding: string;
  userFloorNo: string;
  userUnitNo: string;
  userMobileNumber: string;
  userNote: string;
  orderStatus?: string;
  city: string;
  country: string;
  cartItemsTotalPrice: number;
  paymentMethod: string;
  cartItems: CartItem[];
};
