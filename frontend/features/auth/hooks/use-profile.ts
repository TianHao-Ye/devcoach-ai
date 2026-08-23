import { useQuery } from "@tanstack/react-query";
import { getProgile } from "@/features/auth/api/auth.api";

export const useProfile = () => {
  return useQuery({
    //queryKey: unique identity of cached data in tanstack
    queryKey: ["auth", "profile"],
    queryFn: getProgile,
    retry: false,
  });
};
