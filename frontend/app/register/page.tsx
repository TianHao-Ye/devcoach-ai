"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  registerSchema,
} from "@/features/auth/schemas/register.schema";
import { useRegister } from "@/features/auth/hooks/use-register";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/brand";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import Link from "next/link";

//Component name use PascalCase：
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <section className="flex items-center justify-center p-6 sm:p-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-panel w-full max-w-md space-y-5 p-7 sm:p-10"
      >
        <div className="mb-7"><Brand /></div>
        <div>
          <p className="eyebrow">Get started</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create your account</h1>

          <p className="mt-1 text-sm text-gray-500">
            Create your DevCoach AI account.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Ethan"
            {...register("name")}
          className="field"
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="ethan@example.com"
            {...register("email")}
          className="field"
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          className="field"
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {registerMutation.isSuccess && (
          <p className="text-sm text-green-600">
            Account created successfully.
          </p>
        )}

        {registerMutation.isError && (
          <p className="text-sm text-red-500">
            Registration failed. Please try again.
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? <><LoaderCircle className="animate-spin" />Creating account</> : <>Create account <ArrowRight /></>}
        </Button>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
      </form>
      </section>
      <section className="hidden bg-foreground p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-lg"><Sparkles className="size-10 text-violet-300" /><h2 className="mt-7 text-5xl font-semibold leading-tight tracking-[-0.045em]">Your next opportunity starts with better preparation.</h2><div className="mt-10 space-y-4 text-white/65"><p>01 · Understand how your experience tells a story</p><p>02 · Practice questions tailored to the exact role</p><p>03 · Close gaps with focused AI guidance</p></div></div>
      </section>
    </main>
  );
};

export default RegisterPage;
