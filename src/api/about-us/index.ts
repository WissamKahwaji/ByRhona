import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { AboutUsInfo } from "./type";

const getAboutUsInfo = async () => {
  const res = await publicInstance.get<AboutUsInfo>(API_ROUTES.ABOUT_US.GET);
  return res.data;
};

export { getAboutUsInfo };
