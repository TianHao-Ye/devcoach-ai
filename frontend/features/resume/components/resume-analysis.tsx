"use client";

import { Button } from "@/components/ui/button";
import { useAnalyzeResume } from "../hooks/use-analyze-resume";
import { useResumeAnalysis } from "../hooks/use-resume-analysis";
import { LoaderCircle, RefreshCw, Sparkles } from "lucide-react";

interface ResumeAnalysisProps {
  resumeId: string;
}

export const ResumeAnalysis = ({ resumeId }: ResumeAnalysisProps) => {
  const analysisQuery = useResumeAnalysis(resumeId);
  const analyzeMutation = useAnalyzeResume(resumeId);

  const handleAnalyze = () => {
    analyzeMutation.mutate();
  };

  if (analysisQuery.isPending) {
    return <p>Loading analysis...</p>;
  }

  if (analysisQuery.isError) {
    return (
      <div className="space-y-4">
        <p>No analysis available yet.</p>

        <Button
          type="button"
          size="lg"
          onClick={handleAnalyze}
          disabled={analyzeMutation.isPending}
        >
          {analyzeMutation.isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <Sparkles />
              Analyze resume
            </>
          )}
        </Button>

        {analyzeMutation.isError && (
          <p className="text-sm text-red-500">Failed to analyze resume.</p>
        )}
      </div>
    );
  }

  const analysis = analysisQuery.data;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Resume Analysis</h2>

        <Button
          type="button"
          variant="outline"
          onClick={handleAnalyze}
          disabled={analyzeMutation.isPending}
        >
          {analyzeMutation.isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <RefreshCw />
              Analyze again
            </>
          )}
        </Button>
      </div>

      <div>
        <h3 className="font-semibold">Summary</h3>
        <p className="mt-2 text-gray-700">{analysis.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold">Skills</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {analysis.skills.map((skill) => (
            <span key={skill} className="rounded bg-gray-100 px-3 py-1 text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <AnalysisList title="Strengths" items={analysis.strengths} />

      <AnalysisList title="Gaps" items={analysis.gaps} />

      <AnalysisList title="Suggested Roles" items={analysis.suggestedRoles} />
    </section>
  );
};

interface AnalysisListProps {
  title: string;
  items: string[];
}

const AnalysisList = ({ title, items }: AnalysisListProps) => {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>

      <ul className="mt-2 list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
