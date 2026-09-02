import { buttonVariants } from "@/components/ui/button";
import { CreateInterviewForm } from "@/features/interview/components/create-interview-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NewInterviewPage = () => {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Create a New Interview</h1>

        <p className="mt-1 text-gray-500">
          Create a personalized interview from your resume and target role.
        </p>
      </div>

      <CreateInterviewForm />

      <Link
        href="/dashboard/interviews"
        className={buttonVariants({ variant: "ghost" })}
      >
        <ArrowLeft />
        Back to interviews
      </Link>
    </main>
  );
};

export default NewInterviewPage;
