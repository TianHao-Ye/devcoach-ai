"use client";

import Link from "next/link";

import { useDeleteResume } from "../hooks/use-delete-resume";
import { useResumes } from "../hooks/use-resumes";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, FileText, LoaderCircle, Trash2 } from "lucide-react";

export const ResumeList = () => {
  const resumesQuery = useResumes();
  const deleteMutation = useDeleteResume();

  if (resumesQuery.isPending) {
    return <div className="status-card">Loading your resumes...</div>;
  }

  if (resumesQuery.isError) {
    return <div className="status-card text-red-500">We couldn’t load your resumes.</div>;
  }

  if (resumesQuery.data.length === 0) {
    return <div className="status-card">No resumes yet. Upload one above to unlock AI insights.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {resumesQuery.data.map((resume) => {
        const isDeleting =
          deleteMutation.isPending && deleteMutation.variables === resume.id;

        return (
          <div
            key={resume.id}
            className="surface-card flex min-h-48 flex-col justify-between p-6 hover:-translate-y-1 hover:border-primary/15 hover:shadow-xl"
          >
            <div><span className="mb-6 flex size-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600"><FileText className="size-5" /></span>
              <p className="font-semibold">{resume.originalName}</p>

              <p className="text-sm text-gray-500">
                {(resume.size / 1024).toFixed(1)} KB
              </p>

              <p className="text-sm text-gray-500">
                Uploaded {new Date(resume.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2">
              <Link
                href={`/dashboard/resumes/${resume.id}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Open <ArrowUpRight />
              </Link>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => deleteMutation.mutate(resume.id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Deleting
                  </>
                ) : (
                  <>
                    <Trash2 />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
