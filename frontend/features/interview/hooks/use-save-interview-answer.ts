import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveInterviewAnswer } from "../api/interview.api";
import type { InterviewQuestion } from "../types/interview";

export const useSaveInterviewAnswer = (interviewId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, content }: { questionId: string; content: string }) =>
      saveInterviewAnswer(interviewId, questionId, content),
    onSuccess: (answer) => {
      queryClient.setQueryData<InterviewQuestion[]>(
        ["interviews", interviewId, "questions"],
        (questions) =>
          questions?.map((question) =>
            question.id === answer.questionId
              ? { ...question, answer }
              : question,
          ),
      );
    },
  });
};
