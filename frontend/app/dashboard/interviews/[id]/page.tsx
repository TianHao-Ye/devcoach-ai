import { InterviewDetail } from "@/features/interview/components/interview-detail";

interface InterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

const InterviewPage = async ({ params }: InterviewPageProps) => {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <InterviewDetail interviewId={id} />
    </main>
  );
};

export default InterviewPage;
