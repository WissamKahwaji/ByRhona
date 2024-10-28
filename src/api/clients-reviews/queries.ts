import { useQuery } from "@tanstack/react-query";
import { getReviewsInfo } from ".";

const useGetReviresInfo = () =>
  useQuery({
    queryKey: ["reviews-info"],
    queryFn: () => getReviewsInfo(),
  });

export { useGetReviresInfo };
