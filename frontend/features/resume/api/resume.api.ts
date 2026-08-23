import { api } from "@/lib/api";
import type { Resume } from "../types/resume";

export async function getResumes(): Promise<Resume[]> {
  const response = await api.get<Resume[]>("/resumes");

  return response.data;
}

export async function uploadResume(file: File): Promise<Resume> {
  const formData = new FormData();

  formData.append("file", file);
  const response = await api.post<Resume>("/resumes", formData);

  return response.data;
}

export async function deleteResume(id: string): Promise<void> {
  await api.delete(`/resumes/${id}`);
}
