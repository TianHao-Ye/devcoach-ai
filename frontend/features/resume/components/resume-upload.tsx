"use client";

import { useRef, useState } from "react";

import { useUploadResume } from "../hooks/use-upload-resume";

export const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadResume();

  const handleUpload = () => {
    if (!file) {
      return;
    }

    uploadMutation.mutate(file, {
      onSuccess: () => {
        handleClear();
      },
    });
  };

  const handleClear = () => {
    setFile(null);

    //clean up dom state
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        id="resume-file"
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(event) => {
          setFile(event.target.files?.[0] ?? null);
        }}
      />
      <div className="flex items-center gap-3">
        <label
          htmlFor="resume-file"
          className="cursor-pointer rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Choose a file
        </label>

        <span className="text-sm text-gray-500">
          {file ? file.name : "No resumes chossen yet."}
        </span>
      </div>

      {file && (
        <div className="flex items-center justify-between rounded border p-3">
          <div>
            <p className="font-medium">{file.name}</p>

            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <button
            type="button"
            onClick={handleClear}
            disabled={uploadMutation.isPending}
            className="text-sm text-red-500"
          >
            Clear
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || uploadMutation.isPending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {uploadMutation.isPending ? "Uploading..." : "Upload Resume"}
      </button>

      {uploadMutation.isError && (
        <p className="text-sm text-red-500">Failed to upload resume.</p>
      )}
    </div>
  );
};
