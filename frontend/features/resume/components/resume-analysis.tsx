"use client";

import { useAnalyzeResume } from "../hooks/use-analyze-resume";
import { useResumeAnalysis } from "../hooks/use-resume-analysis";

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

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzeMutation.isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {analyzeMutation.isPending ? "Analyzing..." : "Analyze Resume"}
        </button>

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

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzeMutation.isPending}
          className="rounded border px-4 py-2 text-sm disabled:opacity-50"
        >
          {analyzeMutation.isPending ? "Analyzing..." : "Analyze Again"}
        </button>
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
