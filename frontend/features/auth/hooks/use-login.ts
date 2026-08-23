import { useMutation } from "@tanstack/react-query";
import { login as loginUser } from "@/features/auth/api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
