import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { SignInValues, UserModel } from "./type";
import {
  addProductToFavorites,
  getUserById,
  getUserFavoritesListInfo,
  removeProductFromFavorites,
  requestVoucherAmount,
  signIn,
  signup,
} from ".";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

const useSignInMutation = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      login(data.token, data.result._id, data.result.email);
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
      login(data.token, data.result._id, data.result.email);
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

const useGetUserByIdQuery = (userId: string | undefined) =>
  useQuery({
    queryKey: ["get-user-byId"],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

const useGetUserFavoritesListQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-favorites-list", userId],
    queryFn: () => getUserFavoritesListInfo(userId),
  });

const useAddProductToFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-to-favorites"],
    mutationFn: (data: { userId: string; productId: string }) =>
      addProductToFavorites(data.userId, data.productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-favorites-list"],
      });
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useRemoveProductFromFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["remove-from-favorites"],
    mutationFn: (data: { userId: string; productId: string }) =>
      removeProductFromFavorites(data.userId, data.productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-favorites-list"],
      });
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

export {
  useSignInMutation,
  useSignUpMutation,
  useRequestVoucherAmountMutation,
  useGetUserByIdQuery,
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation,
  useGetUserFavoritesListQuery,
};
