import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevCoach AI",
  description: "AI Interview Preparation Platform",
};

export default function Home() {
  return (
    <main>
      <h1>DevCoach AI</h1>

      <p>AI Interview Preparation Platform</p>
    </main>
  );
}
