"use client";

import Link from "next/link";

import { useDeleteResume } from "../hooks/use-delete-resume";
import { useResumes } from "../hooks/use-resumes";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, LoaderCircle, Trash2 } from "lucide-react";

export const ResumeList = () => {
  const resumesQuery = useResumes();
  const deleteMutation = useDeleteResume();

  if (resumesQuery.isPending) {
    return <p>Loading resumes...</p>;
  }

  if (resumesQuery.isError) {
    return <p>Failed to load resumes.</p>;
  }

  if (resumesQuery.data.length === 0) {
    return <p>No resumes uploaded yet.</p>;
  }

  return (
    <div className="space-y-3">
      {resumesQuery.data.map((resume) => {
        const isDeleting =
          deleteMutation.isPending && deleteMutation.variables === resume.id;

        return (
          <div
            key={resume.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <p className="font-medium">{resume.originalName}</p>

              <p className="text-sm text-gray-500">
                {(resume.size / 1024).toFixed(1)} KB
              </p>

              <p className="text-sm text-gray-500">
                Uploaded {new Date(resume.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/resumes/${resume.id}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <Eye />
                View
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
