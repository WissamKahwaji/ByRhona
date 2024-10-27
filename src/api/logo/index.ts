import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { LogoModel } from "./type";

const getLogoInfo = async () => {
  const res = await publicInstance.get<LogoModel>(API_ROUTES.LOGO.GET);
  return res.data;
};

export { getLogoInfo };
