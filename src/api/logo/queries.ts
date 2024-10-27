import { useQuery } from "@tanstack/react-query";
import { getLogoInfo } from ".";

const useGetLogoInfoQuery = () =>
  useQuery({ queryKey: ["logo-info"], queryFn: () => getLogoInfo() });

export { useGetLogoInfoQuery };
