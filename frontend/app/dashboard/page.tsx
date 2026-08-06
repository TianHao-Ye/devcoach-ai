"use client";

import { useLogout } from "@/features/auth/hooks/use-logout";
import { useProfile } from "@/features/auth/hooks/use-profile";

const DashboardPage = () => {
  const profileQuery = useProfile();
  const { logout } = useLogout();

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
          onClick={logout}
          className="rounded border px-4 py-2"
        >
          Logout
        </button>
      </div>

      <div className="mt-6">
        <p>{user.name ?? user.email}</p>
      </div>
    </main>
  );
};

export default DashboardPage;
