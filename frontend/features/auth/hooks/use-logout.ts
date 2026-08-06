import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { removeAccessToken } from "../utils/token";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    // removeAccessToken();
    queryClient.clear();
    router.replace("/login");
  };

  return { logout };
};
