"use client";

import Link from "next/link";

import { useDeleteResume } from "../hooks/use-delete-resume";
import { useResumes } from "../hooks/use-resumes";

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

            <div className="flex items-center gap-4">
              <Link
                href={`/dashboard/resumes/${resume.id}`}
                className="text-sm underline"
              >
                View
              </Link>

              <button
                type="button"
                onClick={() => deleteMutation.mutate(resume.id)}
                disabled={isDeleting}
                className="text-sm text-red-500 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
