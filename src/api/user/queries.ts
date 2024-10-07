import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { SignInValues, UserModel } from "./type";
import { requestVoucherAmount, signIn, signup } from ".";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

const useSignInMutation = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      login(data.result._id, data.result.email);
      window.location.replace("/");
    },
    onError: () => {
      toast.error("failed to sign in please enter correct email & password");
    },
  });
};

const useSignUpMutation = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (payload: UserModel) => signup(payload),
    onSuccess: data => {
      login(data.result._id, data.result.email);
      toast.success("success");
      window.location.replace("/");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to sign up, please try again later";
      toast.error(errorMessage);
    },
  });
};

const useRequestVoucherAmountMutation = () => {
  return useMutation({
    mutationKey: ["request-voucher"],
    mutationFn: (data: { userId: string; amount: number }) =>
      requestVoucherAmount(data),
    onSuccess: () => {
      toast("success");
    },
    onError: () => {
      toast.error("failed to request voucher, please try again later");
    },
  });
};

export {
  useSignInMutation,
  useSignUpMutation,
  useRequestVoucherAmountMutation,
};
