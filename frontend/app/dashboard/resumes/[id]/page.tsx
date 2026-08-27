import { buttonVariants } from "@/components/ui/button";
import { ResumeDetail } from "@/features/resume/components/resume-detail";
import { ArrowLeft } from "lucide-react";
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
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <ArrowLeft />
        Back to resumes
      </Link>

      <ResumeDetail resumeId={id} />
    </main>
  );
};

export default ResumePage;
