import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import { FavoriteItemsModel } from "../products/type";
import publicInstance from "../publicInstance";
import { SignInValues, UserModel } from "./type";

const signIn = async (data: SignInValues) => {
  const res = await publicInstance.post(API_ROUTES.USER.SIGNIN, data);
  return res.data;
};

const signup = async (payload: UserModel) => {
  const data = createFormData(payload!);

  const res = await publicInstance.post(API_ROUTES.USER.SIGNUP, data);
  return res.data;
};

const requestVoucherAmount = async (data: {
  userId: string;
  amount: number;
}) => {
  const res = await publicInstance.post(
    API_ROUTES.USER.REQUEST_VOUCHER(data.userId),
    data
  );
  return res.data;
};

const getUserById = async (userId: string | undefined) => {
  const res = await publicInstance.get<UserModel>(API_ROUTES.USER.BYID(userId));
  return res.data;
};

const getUserFavoritesListInfo = async (userId: string) => {
  const res = await publicInstance.get<FavoriteItemsModel[]>(
    API_ROUTES.USER.GET_FAVORITES_LIST(userId)
  );
  return res.data;
};

const addProductToFavorites = async (userId: string, productId: string) => {
  const data = { userId, productId };
  const res = await publicInstance.post<string>(
    API_ROUTES.USER.ADD_TO_FAVORITES,
    data
  );
  return res.data;
};

const removeProductFromFavorites = async (
  userId: string,
  productId: string
) => {
  const data = { userId, productId };
  const res = await publicInstance.post<string>(
    API_ROUTES.USER.REMOVE_FROM_FAVORITES,
    data
  );
  return res.data;
};

export {
  signIn,
  signup,
  requestVoucherAmount,
  getUserById,
  addProductToFavorites,
  removeProductFromFavorites,
  getUserFavoritesListInfo,
};
