import { useQuery } from "@tanstack/react-query";
import { getSlidersInfo } from ".";

const useGetSlidersInfo = () =>
  useQuery({
    queryKey: ["sliders-info"],
    queryFn: () => getSlidersInfo(),
  });

export { useGetSlidersInfo };
