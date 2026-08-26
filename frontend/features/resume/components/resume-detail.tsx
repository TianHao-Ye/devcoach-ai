"use client";

import { useResume } from "../hooks/use-resume";
import { ResumeAnalysis } from "./resume-analysis";

interface ResumeDetailProps {
  resumeId: string;
}

export const ResumeDetail = ({ resumeId }: ResumeDetailProps) => {
  const resumeQuery = useResume(resumeId);

  if (resumeQuery.isPending) {
    return <p>Loading resume...</p>;
  }

  if (resumeQuery.isError) {
    return <p>Failed to load resume.</p>;
  }

  const resume = resumeQuery.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{resume.originalName}</h1>

        <p className="mt-1 text-sm text-gray-500">
          {(resume.size / 1024).toFixed(1)} KB
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold">Extracted Content</h2>

        <div className="mt-3 whitespace-pre-wrap rounded border p-4">
          {resume.content || "No text content available."}
        </div>
      </section>

      <ResumeAnalysis resumeId={resumeId} />
    </div>
  );
};
