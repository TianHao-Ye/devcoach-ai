import { useQuery } from "@tanstack/react-query";

import { getResume } from "../api/resume.api";

export const useResume = (resumeId: string) => {
  return useQuery({
    queryKey: ["resumes", resumeId],
    queryFn: () => getResume(resumeId),
    enabled: Boolean(resumeId),
  });
};
