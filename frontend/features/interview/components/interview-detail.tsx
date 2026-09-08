"use client";

import { useInterview } from "../hooks/use-interview";
import { useInterviewQuestions } from "../hooks/use-interview-questions";
import { BriefcaseBusiness, MessageSquareText, Sparkles } from "lucide-react";
import { QuestionAnswer } from "./question-answer";

interface InterviewDetailProps {
  interviewId: string;
}

export const InterviewDetail = ({ interviewId }: InterviewDetailProps) => {
  const interviewQuery = useInterview(interviewId);

  const questionsQuery = useInterviewQuestions(interviewId);

  if (interviewQuery.isPending || questionsQuery.isPending) {
    return <div className="status-card">Preparing your interview...</div>;
  }

  if (interviewQuery.isError || questionsQuery.isError) {
    return <div className="status-card text-red-500">We couldn’t load this interview.</div>;
  }

  const interview = interviewQuery.data;
  const questions = questionsQuery.data;

  return (
    <div className="space-y-8">
      <section className="glass-panel relative overflow-hidden p-7 sm:p-9"><div className="absolute right-0 top-0 size-44 rounded-full bg-primary/15 blur-3xl" />
        <p className="eyebrow">Interview plan</p><h1 className="page-title relative mt-3">{interview.title}</h1>

        <p className="relative mt-4 flex items-center gap-2 text-muted-foreground"><BriefcaseBusiness className="size-4 text-primary" />
          {interview.targetRole}
        </p>
      </section>

      {interview.jobDescription && (
        <section className="surface-card p-6 sm:p-7">
          <h2 className="text-lg font-semibold">Role context</h2>

          <div className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
            {interview.jobDescription}
          </div>
        </section>
      )}

      <section><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><MessageSquareText className="size-5" /></span><div><p className="eyebrow">Personalized practice</p><h2 className="mt-1 text-2xl font-semibold">Interview questions</h2></div></div>

        {questions.length === 0 ? (
          <div className="status-card mt-5"><Sparkles className="mr-2 size-4 text-primary" />No questions generated yet.</div>
        ) : (
          <div className="mt-4 space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="surface-card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-white">
                    {question.order}
                  </span>

                  {question.category && (
                    <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                      {question.category}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-[1.05rem] font-medium leading-7">{question.question}</p>

                <QuestionAnswer
                  interviewId={interviewId}
                  questionId={question.id}
                  questionOrder={question.order}
                  initialAnswer={question.answer?.content}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
