import { buttonVariants } from "@/components/ui/button";
import { InterviewDetail } from "@/features/interview/components/interview-detail";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface InterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

const InterviewPage = async ({ params }: InterviewPageProps) => {
  const { id } = await params;

  return (
    <main className="app-shell max-w-5xl space-y-6">
      <Link
        href="/dashboard/interviews"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <ArrowLeft />
        Back to interviews
      </Link>

      <InterviewDetail interviewId={id} />
    </main>
  );
};

export default InterviewPage;
