"use client";

import { buttonVariants } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

import { useInterviews } from "../hooks/use-interviews";

export const InterviewList = () => {
  const interviewsQuery = useInterviews();

  if (interviewsQuery.isPending) {
    return <p>Loading interviews...</p>;
  }

  if (interviewsQuery.isError) {
    return <p>Failed to load interviews.</p>;
  }

  if (interviewsQuery.data.length === 0) {
    return <p>No interviews created yet.</p>;
  }

  return (
    <div className="space-y-3">
      {interviewsQuery.data.map((interview) => (
        <div
          key={interview.id}
          className="flex items-center justify-between gap-4 rounded border p-4"
        >
          <div>
            <p className="font-medium">{interview.title}</p>
            <p className="text-sm text-gray-500">{interview.targetRole}</p>
            <p className="text-sm text-gray-500">
              Created {new Date(interview.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Link
            href={`/dashboard/interviews/${interview.id}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Eye />
            View
          </Link>
        </div>
      ))}
    </div>
  );
};
