import { buttonVariants } from "@/components/ui/button";
import { InterviewList } from "@/features/interview/components/interview-list";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

const InterviewsPage = () => {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Manage Interviews</h1>

          <p className="mt-1 text-gray-500">
            Create and review your personalized interviews.
          </p>
        </div>

        <Link
          href="/dashboard/interviews/new"
          className={buttonVariants({ size: "lg" })}
        >
          <Plus />
          Create a New Interview
        </Link>
      </div>

      <InterviewList />

      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft />
        Back to dashboard
      </Link>
    </main>
  );
};

export default InterviewsPage;
