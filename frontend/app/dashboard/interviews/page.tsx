import { buttonVariants } from "@/components/ui/button";
import { InterviewList } from "@/features/interview/components/interview-list";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

const InterviewsPage = () => {
  return (
    <main className="app-shell space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Practice studio</p><h1 className="page-title mt-2">Your interviews</h1>

          <p className="mt-1 text-gray-500">
            Create and review your personalized interviews.
          </p>
        </div>

        <Link
          href="/dashboard/interviews/new"
          className={buttonVariants({ size: "lg", className: "hidden sm:inline-flex" })}
        >
          <Plus />
          Create a New Interview
        </Link>
      </div>

      <InterviewList />

      <Link href="/dashboard/interviews/new" className={buttonVariants({ size: "lg", className: "w-full sm:hidden" })}><Plus />Create a New Interview</Link>

      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft />
        Back to dashboard
      </Link>
    </main>
  );
};

export default InterviewsPage;
