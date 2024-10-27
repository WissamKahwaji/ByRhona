import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { DeliveryFeeModel } from "./type";

const getDeliveryFeeInfo = async () => {
  const res = await publicInstance.get<DeliveryFeeModel>(API_ROUTES.FEE.GET);
  return res.data;
};

export { getDeliveryFeeInfo };
