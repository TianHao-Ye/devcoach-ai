import { buttonVariants } from "@/components/ui/button";
import { CreateInterviewForm } from "@/features/interview/components/create-interview-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NewInterviewPage = () => {
  return (
    <main className="app-shell max-w-4xl space-y-8">
      <div>
        <p className="eyebrow">AI interview builder</p><h1 className="page-title mt-2">Create a new interview</h1>

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
