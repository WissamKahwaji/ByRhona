import { useQuery } from "@tanstack/react-query";
import { getDeliveryFeeInfo } from ".";

const useGetDeliveryFeeInfoQuery = () =>
  useQuery({ queryKey: ["fee-info"], queryFn: () => getDeliveryFeeInfo() });

export { useGetDeliveryFeeInfoQuery };
