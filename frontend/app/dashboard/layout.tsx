import { PageHeader } from "@/components/page-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <><PageHeader />{children}</>;
}
