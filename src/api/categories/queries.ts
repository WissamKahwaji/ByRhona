import { useQuery } from "@tanstack/react-query";
import { getCategoryWithProductsInfo } from ".";
import { GetProductParams } from "./type";

const useGetCategoryWithProductsInfoQuery = (params: GetProductParams) =>
  useQuery({
    queryKey: ["get-category-with-products"],
    queryFn: () => getCategoryWithProductsInfo(params),
  });

export { useGetCategoryWithProductsInfoQuery };
