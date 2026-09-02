"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useResumes } from "@/features/resume/hooks/use-resumes";

import { useCreateInterview } from "../hooks/use-create-interview";
import { useGenerateInterviewQuestions } from "../hooks/use-generate-interview-questions";
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">Interview Title</label>

        <input
          {...register("title")}
          placeholder="Frontend Developer Interview"
          className="w-full rounded border p-3"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">Target Role</label>

        <input
          {...register("targetRole")}
          placeholder="Frontend Developer"
          className="w-full rounded border p-3"
        />

        {errors.targetRole && (
          <p className="mt-1 text-sm text-red-500">
            {errors.targetRole.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">Resume</label>

        <select {...register("resumeId")} className="w-full rounded border p-3">
          <option value="">No resume</option>

          {resumesQuery.data?.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.originalName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">Job Description</label>

        <textarea
          {...register("jobDescription")}
          rows={10}
          placeholder="Paste the job description here..."
          className="w-full rounded border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={
          createInterviewMutation.isPending ||
          generateQuestionMutation.isPending
        }
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {createInterviewMutation.isPending
          ? "Creating..."
          : generateQuestionMutation.isPending
            ? "Generating Questions..."
            : "Create Interview"}
      </button>

      {(createInterviewMutation.isError ||
        generateQuestionMutation.isError) && (
        <p className="text-sm text-red-500">Failed to create interview.</p>
      )}
    </form>
  );
};
