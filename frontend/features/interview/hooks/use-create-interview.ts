import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInterview } from "../api/interview.api";

export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
};
