export interface Interview {
  id: string;
  title: string;
  targetRole: string;
  jobDescription: string | null;
  resumeId: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInterviewInput {
  title: string;
  targetRole: string;
  jobDescription?: string;
  resumeId?: string;
}

export interface InterviewQuestion {
  id: string;

  question: string;

  category: string | null;

  order: number;

  interviewId: string;

  createdAt: string;

  updatedAt: string;
}
