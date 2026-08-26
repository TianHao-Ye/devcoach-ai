import { z } from 'zod';

export const resumeAnalysisSchema = z.object({
  summary: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
  strengths: z.array(z.string().min(1)).min(1),
  gaps: z.array(z.string().min(1)),
  suggestedRoles: z.array(z.string().min(1)).min(1),
});

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;
