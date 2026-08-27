"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, LoaderCircle, LogOut } from "lucide-react";
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
    return <main className="p-8">Loading profile...</main>;
  }

  if (!profileQuery.data) {
    return null;
  }

  const user = profileQuery.data;

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
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

      <div className="mt-6 space-y-6">
        <p>{user.name ?? user.email}</p>

        <Link
          href="/dashboard/resumes"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          Manage Resumes
          <ArrowRight />
        </Link>
      </div>
    </main>
  );
};

export default DashboardPage;
