"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginFormData,
  loginSchema,
} from "@/features/auth/schemas/login.schema";
import { useLogin } from "@/features/auth/hooks/use-login";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Brand } from "@/components/brand";
import Link from "next/link";

//Component name use PascalCase：
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <section className="hidden bg-foreground p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Brand />
        <div className="max-w-lg"><p className="eyebrow !text-violet-300">YOUR AI CAREER COPILOT</p><h1 className="mt-5 text-5xl font-semibold leading-tight tracking-[-0.045em]">Walk into every interview with clarity.</h1><p className="mt-5 text-lg leading-8 text-white/60">Personalized preparation built from your actual experience and the role you want next.</p></div>
        <p className="text-xs text-white/35">Prepare with purpose · Perform with confidence</p>
      </section>
      <section className="flex items-center justify-center p-6 sm:p-12">
      <form
        //pass in the function instead of call it
        onSubmit={handleSubmit(onSubmit)}
        className="glass-panel w-full max-w-md space-y-5 p-7 sm:p-10"
      >
        <div className="mb-8 lg:hidden"><Brand /></div>
        <div><p className="eyebrow">Welcome back</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Sign in to your workspace</h1><p className="mt-2 text-sm text-muted-foreground">Continue building your interview edge.</p></div>
        <div>
          <label htmlFor="email" className="field-label">Email</label>

          <input
            id="email"
            type="email"
            //register tells react hook to track and store its value under "email" property
            {...register("email")}
            placeholder="you@example.com"
            className="field"
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="field-label">Password</label>

          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="field"
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="text-sm text-red-500">Invalid email or password.</p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Signing in
            </>
          ) : (
            <>
              Sign in
              <ArrowRight />
            </>
          )}
        </Button>
        <p className="text-center text-sm text-muted-foreground">New to DevCoach? <Link href="/register" className="font-semibold text-primary hover:underline">Create an account</Link></p>
      </form>
      </section>
    </main>
  );
};

export default LoginPage;
