"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useProfile } from "@/features/auth/hooks/use-profile";

const DashboardPage = () => {
  const router = useRouter();
  const profileQuery = useProfile();

  useEffect(() => {
    if (profileQuery.isError) {
      localStorage.removeItem("access_token");
      //authentication redirect use 'replace' instead of 'push'
      router.replace("/login");
    }
  }, [profileQuery.isError, router]);

  if (profileQuery.isPending) {
    return <main className="p-8">Loading profile...</main>;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return null;
  }

  const user = profileQuery.data;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="mt-6 space-y-2">
        <p>Name: {user.name ?? "Not provided"}</p>
        <p>Email: {user.email}</p>
      </div>
    </main>
  );
};

export default DashboardPage;
