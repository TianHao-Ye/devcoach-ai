"use client";

import { useRef, useState } from "react";

import { useUploadResume } from "../hooks/use-upload-resume";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2, Upload } from "lucide-react";

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
    //clean up react react
    setFile(null);

    //clean up browser dom state, if not clean then if user clear and choose the same file, the input onChange might not be triggered again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="glass-panel space-y-5 p-6 sm:p-7">
      <div><p className="font-semibold">Add a resume</p><p className="mt-1 text-sm text-muted-foreground">PDF or DOCX · AI-ready in moments</p></div>
      <input
        //put this input element into fileInputRef.current
        ref={fileInputRef}
        id="resume-file"
        type="file"
        accept=".pdf,.docx"
        // use button declared below the decorate this input
        className="hidden"
        onChange={(event) => {
          setFile(event.target.files?.[0] ?? null);
        }}
      />
      <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-primary/20 bg-primary/3 p-5 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="outline"
          // click button to mock triggering the hidden input element
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload />
          Choose a file
        </Button>

        <span className="text-sm text-muted-foreground">
          {file ? file.name : "No resume chosen yet."}
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

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={uploadMutation.isPending}
          >
            <Trash2 />
            Clear
          </Button>
        </div>
      )}

      <Button
        type="button"
        size="lg"
        onClick={handleUpload}
        disabled={!file || uploadMutation.isPending}
      >
        {uploadMutation.isPending ? (
          <>
            <LoaderCircle className="animate-spin" />
            Uploading
          </>
        ) : (
          <>
            <Upload />
            Upload resume
          </>
        )}
      </Button>

      {uploadMutation.isError && (
        <p className="text-sm text-red-500">Failed to upload resume.</p>
      )}
    </div>
  );
};
