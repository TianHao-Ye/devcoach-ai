"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";

import { useInterviews } from "../hooks/use-interviews";

export const InterviewList = () => {
  const interviewsQuery = useInterviews();

  if (interviewsQuery.isPending) {
    return <div className="status-card">Loading your interview library...</div>;
  }

  if (interviewsQuery.isError) {
    return (
      <div className="status-card text-red-500">
        We couldn’t load your interviews.
      </div>
    );
  }

  if (interviewsQuery.data.length === 0) {
    return (
      <div className="status-card flex-col gap-3">
        <Sparkles className="size-6 text-primary" />
        <p className="font-medium text-foreground">
          Your practice space is ready.
        </p>
        <p>Create your first tailored interview to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {interviewsQuery.data.map((interview) => (
        <div
          key={interview.id}
          className="surface-card group flex min-h-52 flex-col justify-between p-6 hover:-translate-y-1 hover:border-primary/15 hover:shadow-xl"
        >
          <div>
            <span className="mb-7 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageSquareText className="size-5" />
            </span>
            <p className="text-lg font-semibold tracking-tight">
              {interview.title}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {interview.targetRole}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Created {new Date(interview.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Link
            href={`/dashboard/interviews/${interview.id}`}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className:
                "mt-5 self-start px-0 text-primary hover:bg-transparent",
            })}
          >
            Open interview <ArrowUpRight />
          </Link>
        </div>
      ))}
    </div>
  );
};
