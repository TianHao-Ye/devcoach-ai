// features/interview/hooks/use-interview.ts

import { useQuery } from "@tanstack/react-query";

import { getInterview } from "../api/interview.api";

export const useInterview = (interviewId: string) => {
  return useQuery({
    queryKey: ["interviews", interviewId],
    queryFn: () => getInterview(interviewId),
    enabled: Boolean(interviewId),
  });
};
