import { useQuery } from "@tanstack/react-query";
import { getCollectionsInfo } from ".";

const useGetCollectionsInfoQuery = () =>
  useQuery({
    queryKey: ["get-all-collections"],
    queryFn: () => getCollectionsInfo(),
  });

export { useGetCollectionsInfoQuery };
