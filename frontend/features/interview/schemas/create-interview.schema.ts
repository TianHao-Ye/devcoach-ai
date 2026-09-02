import { z } from "zod";

export const createInterviewSchema = z.object({
  title: z.string().min(1, "Title is required"),

  targetRole: z.string().min(1, "Target role is required"),

  jobDescription: z.string().optional(),

  resumeId: z.string().optional(),
});

export type CreateInterviewFormData = z.infer<typeof createInterviewSchema>;
