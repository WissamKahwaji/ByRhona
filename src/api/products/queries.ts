import { useQuery } from "@tanstack/react-query";
import {
  getLastSixProducts,
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

export {
  useGetProductByIdInfoQuery,
  useGetLastSixProductsQuery,
  useGetTopTenExpensiveProductsQuery,
  useGetTopTenCheapestProductsQuery,
};
