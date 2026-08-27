"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  registerSchema,
} from "@/features/auth/schemas/register.schema";
import { useRegister } from "@/features/auth/hooks/use-register";
import { Button } from "@/components/ui/button";

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
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-lg border p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold">Create Account</h1>

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
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
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
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
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
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
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
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </Button>
      </form>
    </main>
  );
};

export default RegisterPage;
