import { useMutation, useQueryClient } from "@tanstack/react-query";

import { analyzeResume } from "../api/resume.api";

export const useAnalyzeResume = (resumeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => analyzeResume(resumeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes", resumeId, "analysis"],
      });
    },
  });
};
