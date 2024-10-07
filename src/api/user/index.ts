import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
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

export { signIn, signup, requestVoucherAmount };
