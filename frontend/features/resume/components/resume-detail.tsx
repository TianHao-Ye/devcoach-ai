"use client";

import { useResume } from "../hooks/use-resume";
import { ResumeAnalysis } from "./resume-analysis";
import { FileText } from "lucide-react";

interface ResumeDetailProps {
  resumeId: string;
}

export const ResumeDetail = ({ resumeId }: ResumeDetailProps) => {
  const resumeQuery = useResume(resumeId);

  if (resumeQuery.isPending) {
    return <div className="status-card">Loading your resume...</div>;
  }

  if (resumeQuery.isError) {
    return <div className="status-card text-red-500">We couldn’t load this resume.</div>;
  }

  const resume = resumeQuery.data;

  return (
    <div className="space-y-6">
      <div className="glass-panel flex items-center gap-5 p-7 sm:p-9"><span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600"><FileText /></span><div>
        <p className="eyebrow">Resume workspace</p><h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{resume.originalName}</h1>

        <p className="mt-1 text-sm text-gray-500">
          {(resume.size / 1024).toFixed(1)} KB
        </p></div>
      </div>

      <section className="surface-card p-6 sm:p-7">
        <h2 className="text-lg font-semibold">Extracted content</h2>

        <div className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-muted/55 p-5 text-sm leading-7 text-muted-foreground">
          {resume.content || "No text content available."}
        </div>
      </section>

      <ResumeAnalysis resumeId={resumeId} />
    </div>
  );
};
