import type { Metadata } from "next";
import { Brand } from "@/components/brand";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, FileSearch, Sparkles } from "lucide-react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevCoach AI",
  description: "AI Interview Preparation Platform",
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Brand />
        <div className="flex items-center gap-2">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Sign in
          </Link>
          <Link href="/register" className={buttonVariants()}>
            Get started <ArrowRight />
          </Link>
        </div>
      </nav>
      <section className="app-shell grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/65 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <Sparkles className="size-3.5" /> Your intelligent career copilot
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-7xl">
            Prepare smarter.
            <br />
            <span className="bg-gradient-to-r from-primary via-violet-500 to-sky-500 bg-clip-text text-transparent">
              Interview better.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            Turn your resume and target role into focused insights and tailored
            interview practice—powered by AI, designed around you.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/register" className={buttonVariants({ size: "lg" })}>
              Start preparing free <ArrowRight />
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              I have an account
            </Link>
          </div>
        </div>
        <div className="glass-panel relative p-5 sm:p-7">
          <div className="absolute -right-16 -top-16 size-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="flex items-center justify-between border-b border-black/5 pb-5">
            <div>
              <p className="eyebrow">AI readiness</p>
              <p className="mt-1 text-lg font-semibold">Frontend Engineer</p>
            </div>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-semibold text-primary">
              86
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="surface-card p-5">
              <FileSearch className="mb-8 text-primary" />
              <p className="text-xs text-muted-foreground">Resume signal</p>
              <p className="mt-1 font-semibold">Strong alignment</p>
            </div>
            <div className="surface-card p-5">
              <BrainCircuit className="mb-8 text-violet-500" />
              <p className="text-xs text-muted-foreground">Practice set</p>
              <p className="mt-1 font-semibold">12 tailored questions</p>
            </div>
          </div>
          <div className="mt-3 rounded-2xl bg-foreground p-5 text-white">
            <div className="flex items-center gap-2 text-xs text-white/55">
              <Sparkles className="size-3.5 text-violet-300" /> AI COACH INSIGHT
            </div>
            <p className="mt-3 leading-6 text-white/90">
              Focus your examples on measurable product impact and
              cross-functional ownership.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
