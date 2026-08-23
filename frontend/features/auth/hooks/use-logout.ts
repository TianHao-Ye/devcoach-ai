import { useMutation } from "@tanstack/react-query";
import { logout as logoutUser } from "@/features/auth/api/auth.api";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
