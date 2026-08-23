import { ResumeList } from "@/features/resume/components/resume-list";
import { ResumeUpload } from "@/features/resume/components/resume-upload";
import Link from "next/link";

const ResumesPage = () => {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Resumes</h1>

        <p className="mt-1 text-gray-500">Upload and manage your resumes.</p>
      </div>

      <ResumeUpload />

      <ResumeList />
      <Link
        href="/dashboard"
        className="inline-block rounded bg-black px-4 py-2 text-white"
      >
        Back
      </Link>
    </main>
  );
};

export default ResumesPage;
