import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteResume } from "../api/resume.api";

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
};
