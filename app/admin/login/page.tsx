"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock, Mail, Shield } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/dashboard";
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back, Admin");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setAuthError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md px-4">
      <div
        className="rounded-2xl border border-white/5 bg-white/3 p-8 shadow-2xl backdrop-blur-sm"
        style={{
          boxShadow:
            "0 0 0 1px oklch(0.35 0.18 264 / 0.15), 0 32px 64px -16px oklch(0.05 0.010 264 / 0.8)",
        }}
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[oklch(0.35_0.18_264)] shadow-lg">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Admin Access
          </h1>
          <p className="mt-1.5 text-sm text-white/40">
            Rajesh Kumar · Executive CMS
          </p>
        </div>

        {authError && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider text-white/40"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
                {...register("email")}
                className={cn(
                  "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all",
                  "focus:border-[oklch(0.35_0.18_264)] focus:ring-1 focus:ring-[oklch(0.35_0.18_264)]",
                  errors.email
                    ? "border-red-500/50"
                    : "border-white/10 hover:border-white/20"
                )}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-wider text-white/40"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password")}
                className={cn(
                  "w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all",
                  "focus:border-[oklch(0.35_0.18_264)] focus:ring-1 focus:ring-[oklch(0.35_0.18_264)]",
                  errors.password
                    ? "border-red-500/50"
                    : "border-white/10 hover:border-white/20"
                )}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "mt-2 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all",
              "bg-[oklch(0.35_0.18_264)] hover:bg-[oklch(0.40_0.18_264)]",
              "focus:outline-none focus:ring-2 focus:ring-[oklch(0.35_0.18_264)] focus:ring-offset-2 focus:ring-offset-transparent",
              "disabled:cursor-not-allowed disabled:opacity-60",
              "flex items-center justify-center gap-2"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Authenticating…
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/20">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="relative z-10 w-full max-w-md px-4">
      <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-white/5 bg-white/3 p-8">
        <Loader2 className="h-6 w-6 animate-spin text-white/40" />
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[oklch(0.07_0.010_264)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.15 0.015 264 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.15 0.015 264 / 0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.35 0.18 264 / 0.15), transparent 60%)",
        }}
      />
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
