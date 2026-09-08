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
    return <div className="status-card">Loading AI insights...</div>;
  }

  if (analysisQuery.isError) {
    return (
      <div className="glass-panel space-y-4 p-7"><div><p className="eyebrow">AI analysis</p><h2 className="mt-2 text-2xl font-semibold">Unlock insights from this resume</h2><p className="mt-2 text-sm text-muted-foreground">Discover strengths, gaps, skills and best-fit roles.</p></div>

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
    <section className="glass-panel space-y-7 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div><p className="eyebrow">AI analysis</p><h2 className="mt-1 text-2xl font-semibold">Your career signals</h2></div>

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

      <div className="rounded-2xl bg-foreground p-6 text-white">
        <h3 className="flex items-center gap-2 font-semibold"><Sparkles className="size-4 text-violet-300" /> AI Summary</h3>
        <p className="mt-3 leading-7 text-white/70">{analysis.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold">Skills</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {analysis.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-primary/10 bg-primary/7 px-3 py-1.5 text-sm font-medium text-primary">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3"><AnalysisList title="Strengths" items={analysis.strengths} /><AnalysisList title="Growth areas" items={analysis.gaps} /><AnalysisList title="Suggested roles" items={analysis.suggestedRoles} /></div>
    </section>
  );
};

interface AnalysisListProps {
  title: string;
  items: string[];
}

const AnalysisList = ({ title, items }: AnalysisListProps) => {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/65 p-5">
      <h3 className="font-semibold">{title}</h3>

      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{item}</li>
        ))}
      </ul>
    </div>
  );
};
