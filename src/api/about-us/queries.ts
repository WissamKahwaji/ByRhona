import { useQuery } from "@tanstack/react-query";
import { getAboutUsInfo } from ".";

const useGetAboutUsInfoQuery = () =>
  useQuery({ queryKey: ["about-us-info"], queryFn: () => getAboutUsInfo() });
export { useGetAboutUsInfoQuery };
