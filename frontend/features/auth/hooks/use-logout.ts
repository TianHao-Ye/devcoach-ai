import { useMutation } from "@tanstack/react-query";
import { logout as logoutUser } from "@/lib/auth";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
