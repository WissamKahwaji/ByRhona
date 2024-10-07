import { useQuery } from "@tanstack/react-query";
import {
  getLastSixProducts,
  getOffersProducts,
  getPaymentConfig,
  getProductById,
  getTopTenCheapestProducts,
  getTopTenExpensiveProducts,
} from ".";

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

export {
  useGetProductByIdInfoQuery,
  useGetLastSixProductsQuery,
  useGetTopTenExpensiveProductsQuery,
  useGetTopTenCheapestProductsQuery,
  useGetOffersProductsQuery,
  useGetPaymentConfigQuery,
};
