import { z } from 'zod';

export const resumeAnalysisSchema = z.object({
  summary: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
  strengths: z.array(z.string().min(1)).min(1),
  gaps: z.array(z.string().min(1)),
  suggestedRoles: z.array(z.string().min(1)).min(1),
});

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;

export const generatedInterviewQuestionSchema = z.object({
  question: z.string().min(1),
  category: z.string().min(1),
});

export const generatedInterviewQuestionsSchema = z
  .array(generatedInterviewQuestionSchema)
  .length(8);

export type GeneratedInterviewQuestion = z.infer<
  typeof generatedInterviewQuestionSchema
>;
