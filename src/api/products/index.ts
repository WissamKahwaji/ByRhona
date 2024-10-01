import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { Product } from "./type";

const getProductById = async (id: string | undefined) => {
  const res = await publicInstance.get<Product>(
    API_ROUTES.PRODUCTS.GET_BY_ID(id)
  );
  return res.data;
};

const getLastSixProducts = async () => {
  const res = await publicInstance.get<Product[]>(
    API_ROUTES.PRODUCTS.GET_LAST_SIX
  );
  return res.data;
};
const getTopTenExpensiveProducts = async () => {
  const res = await publicInstance.get<Product[]>(
    API_ROUTES.PRODUCTS.GET_TOP_TEN_EXPENSIVE
  );
  return res.data;
};

const getTopTenCheapestProducts = async () => {
  const res = await publicInstance.get<Product[]>(
    API_ROUTES.PRODUCTS.GET_TOP_TEN_CHEAPEST
  );
  return res.data;
};

export {
  getProductById,
  getLastSixProducts,
  getTopTenExpensiveProducts,
  getTopTenCheapestProducts,
};
