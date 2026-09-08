import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "DevCoach AI",
  description: "AI-powered interview preparation and career coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col selection:bg-primary/15 selection:text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
