"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, FileText, LoaderCircle, LogOut, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const profileQuery = useProfile();
  const logoutMutation = useLogout();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        router.replace("/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  if (profileQuery.isPending) {
    return <main className="app-shell"><div className="status-card">Loading your workspace...</div></main>;
  }

  if (!profileQuery.data) {
    return null;
  }

  const user = profileQuery.data;

  return (
    <main className="app-shell">
      <div className="flex items-center justify-between">
        <div><p className="eyebrow">Workspace overview</p><h1 className="page-title mt-2">Good to see you, {user.name?.split(" ")[0] ?? "there"}.</h1><p className="page-copy">What would you like to improve today?</p></div>
        <Button
          type="submit"
          variant="ghost"
          onClick={onLogout}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Logging out
            </>
          ) : (
            <>
              <LogOut />
              Logout
            </>
          )}
        </Button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="glass-panel group relative overflow-hidden p-7 sm:p-8"><div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/15 blur-2xl" /><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><FileText /></span><p className="mt-10 text-xs font-semibold text-muted-foreground">STEP 01</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Sharpen your resume</h2><p className="mt-3 max-w-md leading-7 text-muted-foreground">Upload your resume and turn it into actionable strengths, skill signals, and opportunities.</p>
        <Link
          href="/dashboard/resumes"
          className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8" })}
        >
          Manage Resumes
          <ArrowRight />
        </Link>
        </section>
        <section className="glass-panel group relative overflow-hidden bg-foreground p-7 text-white sm:p-8"><div className="absolute -right-8 -top-8 size-32 rounded-full bg-violet-500/25 blur-2xl" /><span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-violet-300"><MessageSquareText /></span><p className="mt-10 text-xs font-semibold text-white/40">STEP 02</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Practice with precision</h2><p className="mt-3 max-w-md leading-7 text-white/55">Generate role-specific questions grounded in your resume and the job you’re targeting.</p>
        <Link
          href="/dashboard/interviews"
          className={buttonVariants({ size: "lg", className: "mt-8 bg-white !text-foreground hover:bg-white/90 hover:!text-foreground" })}
        >
          Manage Interviews
          <ArrowRight />
        </Link>
        </section>
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4 text-sm text-muted-foreground"><Sparkles className="size-4 text-primary" /><span><strong className="text-foreground">Coach tip:</strong> Start with a current resume so your interview questions reflect your strongest evidence.</span></div>
    </main>
  );
};

export default DashboardPage;
