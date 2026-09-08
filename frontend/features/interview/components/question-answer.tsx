"use client";

import { Button } from "@/components/ui/button";
import { Check, LoaderCircle, Save } from "lucide-react";
import { type SyntheticEvent, useState } from "react";

import { useSaveInterviewAnswer } from "../hooks/use-save-interview-answer";

interface QuestionAnswerProps {
  interviewId: string;
  questionId: string;
  questionOrder: number;
  initialAnswer?: string;
}

export const QuestionAnswer = ({
  interviewId,
  questionId,
  questionOrder,
  initialAnswer = "",
}: QuestionAnswerProps) => {
  const [content, setContent] = useState(initialAnswer);
  const [savedContent, setSavedContent] = useState(initialAnswer);
  const saveMutation = useSaveInterviewAnswer(interviewId);
  const trimmedContent = content.trim();
  const hasChanges = trimmedContent !== savedContent.trim();

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveMutation.mutate(
      { questionId, content: trimmedContent },
      { onSuccess: (answer) => setSavedContent(answer.content) },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 border-t border-black/5 pt-5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={`answer-${questionId}`} className="text-sm font-semibold">
          Your answer
        </label>
        {savedContent && !hasChanges && !saveMutation.isPending && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <Check className="size-3.5" /> Saved
          </span>
        )}
      </div>

      <textarea
        id={`answer-${questionId}`}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={5}
        placeholder={`Draft your answer to question ${questionOrder}...`}
        className="field mt-3 h-auto min-h-36 resize-y py-3 leading-6"
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant={hasChanges ? "default" : "outline"}
          disabled={!trimmedContent || !hasChanges || saveMutation.isPending}
        >
          {saveMutation.isPending ? (
            <><LoaderCircle className="animate-spin" />Saving</>
          ) : (
            <><Save />Save answer</>
          )}
        </Button>

        {saveMutation.isError && (
          <p className="text-sm text-red-500">Couldn’t save your answer. Please try again.</p>
        )}
      </div>
    </form>
  );
};
