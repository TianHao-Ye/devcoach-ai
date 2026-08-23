import { ResumeDetail } from "@/features/resume/components/resume-detail";

interface ResumePageProps {
  params: Promise<{
    id: string;
  }>;
}

const ResumePage = async ({ params }: ResumePageProps) => {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <ResumeDetail resumeId={id} />
    </main>
  );
};

export default ResumePage;
