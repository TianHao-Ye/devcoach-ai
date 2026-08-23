import { useQuery } from "@tanstack/react-query";

import { getResume } from "../api/resume.api";

export const useResume = (id: string) => {
  return useQuery({
    queryKey: ["resumes", id],
    queryFn: () => getResume(id),
    enabled: Boolean(id),
  });
};
