export interface ResumeSummary {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resume extends ResumeSummary {
  userId: string;
  content: string | null;
}
