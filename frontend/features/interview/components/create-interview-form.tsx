"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useResumes } from "@/features/resume/hooks/use-resumes";

import { useCreateInterview } from "../hooks/use-create-interview";
import { useGenerateInterviewQuestions } from "../hooks/use-generate-interview-questions";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Sparkles } from "lucide-react";
import {
  createInterviewSchema,
  type CreateInterviewFormData,
} from "../schemas/create-interview.schema";

export const CreateInterviewForm = () => {
  const router = useRouter();

  const resumesQuery = useResumes();
  const createInterviewMutation = useCreateInterview();
  const generateQuestionMutation = useGenerateInterviewQuestions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInterviewFormData>({
    resolver: zodResolver(createInterviewSchema),
  });

  const onSubmit = async (data: CreateInterviewFormData) => {
    const interview = await createInterviewMutation.mutateAsync({
      title: data.title,
      targetRole: data.targetRole,

      jobDescription: data.jobDescription || undefined,
      resumeId: data.resumeId || undefined,
    });

    await generateQuestionMutation.mutateAsync(interview.id);

    router.push(`/dashboard/interviews/${interview.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel space-y-6 p-6 sm:p-8">
      <div>
        <label className="field-label">Interview Title</label>

        <input
          {...register("title")}
          placeholder="Frontend Developer Interview"
          className="field"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="field-label">Target Role</label>

        <input
          {...register("targetRole")}
          placeholder="Frontend Developer"
          className="field"
        />

        {errors.targetRole && (
          <p className="mt-1 text-sm text-red-500">
            {errors.targetRole.message}
          </p>
        )}
      </div>

      <div>
        <label className="field-label">Resume <span className="font-normal text-muted-foreground">— optional</span></label>

        <select {...register("resumeId")} className="field">
          <option value="">No resume</option>

          {resumesQuery.data?.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.originalName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label">Job Description <span className="font-normal text-muted-foreground">— optional</span></label>

        <textarea
          {...register("jobDescription")}
          rows={10}
          placeholder="Paste the job description here..."
          className="field h-auto min-h-52 py-3 leading-6"
        />
      </div>

      <Button
        type="submit"
        disabled={
          createInterviewMutation.isPending ||
          generateQuestionMutation.isPending
        }
        size="lg"
        className="w-full sm:w-auto"
      >
        {(createInterviewMutation.isPending || generateQuestionMutation.isPending) ? <><LoaderCircle className="animate-spin" />{createInterviewMutation.isPending ? "Creating interview" : "Generating questions"}</> : <><Sparkles />Create with AI</>}
      </Button>

      {(createInterviewMutation.isError ||
        generateQuestionMutation.isError) && (
        <p className="text-sm text-red-500">Failed to create interview.</p>
      )}
    </form>
  );
};
