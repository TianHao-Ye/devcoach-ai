"use client";

import { useInterview } from "../hooks/use-interview";
import { useInterviewQuestions } from "../hooks/use-interview-questions";

interface InterviewDetailProps {
  interviewId: string;
}

export const InterviewDetail = ({ interviewId }: InterviewDetailProps) => {
  const interviewQuery = useInterview(interviewId);

  const questionsQuery = useInterviewQuestions(interviewId);

  if (interviewQuery.isPending || questionsQuery.isPending) {
    return <p>Loading interview...</p>;
  }

  if (interviewQuery.isError || questionsQuery.isError) {
    return <p>Failed to load interview.</p>;
  }

  const interview = interviewQuery.data;
  const questions = questionsQuery.data;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold">{interview.title}</h1>

        <p className="mt-2 text-gray-600">
          Target Role: {interview.targetRole}
        </p>
      </section>

      {interview.jobDescription && (
        <section>
          <h2 className="text-lg font-semibold">Job Description</h2>

          <div className="mt-3 whitespace-pre-wrap rounded border p-4">
            {interview.jobDescription}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">Interview Questions</h2>

        {questions.length === 0 ? (
          <p className="mt-4 text-gray-500">No questions generated yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="rounded border p-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">
                    Question {question.order}
                  </span>

                  {question.category && (
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                      {question.category}
                    </span>
                  )}
                </div>

                <p className="mt-3">{question.question}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
