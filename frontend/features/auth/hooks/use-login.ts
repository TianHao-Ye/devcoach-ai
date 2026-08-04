import { useMutation } from "@tanstack/react-query";
import { login as loginUser } from "@/lib/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
