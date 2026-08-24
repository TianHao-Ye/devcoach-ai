import { ResumeDetail } from "@/features/resume/components/resume-detail";
import Link from "next/link";

interface ResumePageProps {
  params: Promise<{
    id: string;
  }>;
}

const ResumePage = async ({ params }: ResumePageProps) => {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-8">
      <Link
        href="/dashboard/resumes"
        className="inline-block text-sm text-gray-600 hover:text-black"
      >
        ← Back to resumes
      </Link>

      <ResumeDetail resumeId={id} />
    </main>
  );
};

export default ResumePage;
