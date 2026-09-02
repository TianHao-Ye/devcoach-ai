import { api } from "@/lib/api";

import type {
  CreateInterviewInput,
  Interview,
  InterviewQuestion,
} from "../types/interview";

export async function createInterview(
  input: CreateInterviewInput,
): Promise<Interview> {
  const response = await api.post<Interview>("/interviews", input);

  return response.data;
}

export async function getInterviews(): Promise<Interview[]> {
  const response = await api.get<Interview[]>("/interviews");

  return response.data;
}

export async function generateInterviewQuestions(interviewId: string) {
  const response = await api.post(
    `/interviews/${interviewId}/questions/generate`,
  );

  return response.data;
}

export async function getInterview(interviewId: string): Promise<Interview> {
  const response = await api.get<Interview>(`/interviews/${interviewId}`);

  return response.data;
}

export async function getInterviewQuestions(
  interviewId: string,
): Promise<InterviewQuestion[]> {
  const response = await api.get<InterviewQuestion[]>(
    `/interviews/${interviewId}/questions`,
  );

  return response.data;
}
