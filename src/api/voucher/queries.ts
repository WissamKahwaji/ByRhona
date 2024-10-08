import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addVoucher, editVoucherAmount, getUserVoucher } from ".";
import { VoucherModel } from "./type";
import { toast } from "react-toastify";

const useGetUserVoucherQuery = () =>
  useQuery({
    queryKey: ["get-user-voucher"],
    queryFn: () => getUserVoucher(),
  });

const useAddVoucherMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-voucher"],
    mutationFn: (payload: VoucherModel) => addVoucher(payload),
    onSuccess() {
      toast.success(`got voucher successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-voucher"],
      });
    },
    onError() {
      toast.error(`failed to get Voucher`);
    },
  });
};

const useEditVoucherAmountMutaion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-voucher-amount"],
    mutationFn: (payload: VoucherModel) => editVoucherAmount(payload),
    onSuccess() {
      toast.success(`edit voucher successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-voucher"],
      });
    },
    onError() {
      toast.error(`failed to get Voucher`);
    },
  });
};

export {
  useGetUserVoucherQuery,
  useAddVoucherMutaion,
  useEditVoucherAmountMutaion,
};
