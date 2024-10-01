import { useQuery } from "@tanstack/react-query";
import { getContactUsInfo } from ".";

const useGetContactUsInfo = () =>
  useQuery({
    queryKey: ["contact-us-info"],
    queryFn: () => getContactUsInfo(),
  });

export { useGetContactUsInfo };
