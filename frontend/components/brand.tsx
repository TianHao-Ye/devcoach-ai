import { Sparkles } from "lucide-react";
import Link from "next/link";

export const Brand = ({ href = "/" }: { href?: string }) => (
  <Link href={href} className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
    <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-[0_8px_22px_-10px_var(--primary)]">
      <Sparkles className="size-4" />
    </span>
    <span>DevCoach <span className="text-primary">AI</span></span>
  </Link>
);
