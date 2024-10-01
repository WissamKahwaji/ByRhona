import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { CategoryModel, GetProductParams } from "./type";

const getCategoryWithProductsInfo = async (params: GetProductParams) => {
  const res = await publicInstance.get<CategoryModel[]>(
    API_ROUTES.CATEGORIES.GET_WITH_PRODUCTS,
    { params }
  );
  return res.data;
};

export { getCategoryWithProductsInfo };
