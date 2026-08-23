import { api } from "@/lib/api";
import type { Resume, ResumeSummary } from "../types/resume";

export async function getResumes(): Promise<ResumeSummary[]> {
  const response = await api.get<ResumeSummary[]>("/resumes");

  return response.data;
}

export async function getResume(id: string): Promise<Resume> {
  const response = await api.get<Resume>(`/resumes/${id}`);

  return response.data;
}

export async function uploadResume(file: File): Promise<ResumeSummary> {
  const formData = new FormData();

  formData.append("file", file);
  const response = await api.post<ResumeSummary>("/resumes", formData);

  return response.data;
}

export async function deleteResume(id: string): Promise<void> {
  await api.delete(`/resumes/${id}`);
}
