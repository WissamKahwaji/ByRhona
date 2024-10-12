import { useQuery } from "@tanstack/react-query";
import { getCollectionByIdInfo, getCollectionsInfo } from ".";

const useGetCollectionsInfoQuery = () =>
  useQuery({
    queryKey: ["get-all-collections"],
    queryFn: () => getCollectionsInfo(),
  });

const useGetCollectionByIdInfoQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-collection-by-Id"],
    queryFn: () => getCollectionByIdInfo(id!),
    enabled: !!id,
  });

export { useGetCollectionsInfoQuery, useGetCollectionByIdInfoQuery };
