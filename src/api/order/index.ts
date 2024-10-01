import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { PaymentOrdersValue, UserOrder } from "./type";

const submitOrderDetails = async (data: PaymentOrdersValue) => {
  const res = await publicInstance.post(API_ROUTES.ORDERS.SUBMIT_DETAILS, data);
  return res.data;
};

const getUserOrders = async (id: string) => {
  const res = await publicInstance.get<UserOrder[]>(
    API_ROUTES.ORDERS.USER_ORDERS(id)
  );
  return res.data;
};

export { submitOrderDetails, getUserOrders };
