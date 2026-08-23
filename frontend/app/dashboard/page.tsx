"use client";

import { useLogout } from "@/features/auth/hooks/use-logout";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { useQueryClient } from "@tanstack/react-query";
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
        <button
          type="button"
          onClick={onLogout}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <p>{user.name ?? user.email}</p>

        <Link
          href="/dashboard/resumes"
          className="inline-block rounded bg-black px-4 py-2 text-white"
        >
          Manage Resumes
        </Link>
      </div>
    </main>
  );
};

export default DashboardPage;
