import { useQuery } from "@tanstack/react-query";
import { getDepartmentsInfo } from ".";

const useGetDepartmentsInfoQuery = () =>
  useQuery({
    queryKey: ["get-departments"],
    queryFn: () => getDepartmentsInfo(),
  });

export { useGetDepartmentsInfoQuery };
