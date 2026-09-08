import { buttonVariants } from "@/components/ui/button";
import { ResumeList } from "@/features/resume/components/resume-list";
import { ResumeUpload } from "@/features/resume/components/resume-upload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ResumesPage = () => {
  return (
    <main className="app-shell space-y-8">
      <div>
        <p className="eyebrow">Career foundation</p><h1 className="page-title mt-2">Your resumes</h1>

        <p className="mt-1 text-gray-500">Upload and manage your resumes.</p>
      </div>

      <ResumeUpload />

      <ResumeList />
      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft />
        Back to dashboard
      </Link>
    </main>
  );
};

export default ResumesPage;
