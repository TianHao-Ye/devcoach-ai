// features/interview/hooks/use-interview-questions.ts

import { useQuery } from "@tanstack/react-query";

import { getInterviewQuestions } from "../api/interview.api";

export const useInterviewQuestions = (interviewId: string) => {
  return useQuery({
    queryKey: ["interviews", interviewId, "questions"],
    queryFn: () => getInterviewQuestions(interviewId),
    enabled: Boolean(interviewId),
  });
};
