import { useMutation } from "@tanstack/react-query";

import { generateInterviewQuestions } from "../api/interview.api";

export const useGenerateInterviewQuestions = () => {
  return useMutation({
    mutationFn: generateInterviewQuestions,
  });
};
