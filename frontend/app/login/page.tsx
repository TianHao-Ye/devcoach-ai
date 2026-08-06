"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginFormData,
  loginSchema,
} from "@/features/auth/schemas/login.schema";
import { useLogin } from "@/features/auth/hooks/use-login";
import { useRouter } from "next/navigation";

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
    <main className="flex min-h-screen items-center justify-center">
      <form
        //pass in the function instead of call it
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            //register tells react hook to track and store its value under "email" property
            {...register("email")}
            className="w-full rounded border p-2"
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full rounded border p-2"
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="text-sm text-red-500">Invalid email or password.</p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
