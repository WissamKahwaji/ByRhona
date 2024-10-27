import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUserToNotifyList,
  getLastSixProducts,
  getOffersProducts,
  getPaymentConfig,
  getProductById,
  getTopTenCheapestProducts,
  getTopTenExpensiveProducts,
} from ".";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

const useGetProductByIdInfoQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-product-by-id", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

const useGetLastSixProductsQuery = () =>
  useQuery({
    queryKey: ["get-last-six"],
    queryFn: () => getLastSixProducts(),
  });

const useGetTopTenExpensiveProductsQuery = () =>
  useQuery({
    queryKey: ["get-top-ten-expensive"],
    queryFn: () => getTopTenExpensiveProducts(),
  });

const useGetTopTenCheapestProductsQuery = () =>
  useQuery({
    queryKey: ["get-top-ten-cheapest"],
    queryFn: () => getTopTenCheapestProducts(),
  });
const useGetOffersProductsQuery = () =>
  useQuery({
    queryKey: ["get-offers-products"],
    queryFn: () => getOffersProducts(),
  });

const useGetPaymentConfigQuery = () =>
  useQuery({
    queryKey: ["payment-config"],
    queryFn: () => getPaymentConfig(),
    staleTime: 0,
  });

const useAddUserToNotifyListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-to-notify-list"],
    mutationFn: (data: { productId: string; userId: string }) =>
      addUserToNotifyList(data.productId, data.userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["get-product-by-id", variables.productId],
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
  useGetProductByIdInfoQuery,
  useGetLastSixProductsQuery,
  useGetTopTenExpensiveProductsQuery,
  useGetTopTenCheapestProductsQuery,
  useGetOffersProductsQuery,
  useGetPaymentConfigQuery,
  useAddUserToNotifyListMutation,
};
