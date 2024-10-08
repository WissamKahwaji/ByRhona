import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { VoucherModel } from "./type";

const getUserVoucher = async () => {
  const res = await publicInstance.get<VoucherModel>(
    API_ROUTES.VOUCHER.GET_USER_VOUCHER
  );
  return res.data;
};

const addVoucher = async (payload: VoucherModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(
    API_ROUTES.VOUCHER.ADD(payload.userId),
    data
  );
  return res.data;
};

const editVoucherAmount = async (payload: VoucherModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.VOUCHER.EDIT_AMOUNT(payload._id),
    data
  );
  return res.data;
};

export { getUserVoucher, addVoucher, editVoucherAmount };
