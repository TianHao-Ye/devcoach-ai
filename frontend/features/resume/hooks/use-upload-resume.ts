import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadResume } from "../api/resume.api";

export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
};
