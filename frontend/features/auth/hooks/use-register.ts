import { useMutation } from "@tanstack/react-query";

import { register as registerUser } from "@/features/auth/api/auth.api";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,

    onSuccess: (response) => {
      console.log("Register success:", response);
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
};
