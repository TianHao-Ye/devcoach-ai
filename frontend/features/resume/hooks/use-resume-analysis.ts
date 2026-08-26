import { useQuery } from "@tanstack/react-query";

import { getResumeAnalysis } from "../api/resume.api";

export const useResumeAnalysis = (resumeId: string) => {
  return useQuery({
    queryKey: ["resumes", resumeId, "analysis"],
    queryFn: () => getResumeAnalysis(resumeId),
    enabled: Boolean(resumeId),
    retry: false,
  });
};
