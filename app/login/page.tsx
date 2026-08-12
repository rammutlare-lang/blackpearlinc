"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";

const highlights = [
  ["Trusted Professionals", "Vetted experts you can rely on."],
  ["Secure & Confidential", "Your information is always protected."],
  ["Fast & Convenient", "Get the help you need, when you need it."],
];

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setServerError("Incorrect email or password. Please try again.");
      return;
    }
    router.push(searchParams.get("callbackUrl") ?? "/dashboard");
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
      <div className="hidden lg:flex flex-col justify-between bg-tw-black diagonal-accent p-12">
        <Logo dark />
        <div>
          <h1 className="text-4xl font-black text-white leading-tight">
            Expert Advice. <br />
            <span className="text-tw-red">Fairer Workplaces.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-sm">
            Connecting people and employers with trusted labour law professionals
            across South Africa.
          </p>
          <div className="mt-8 space-y-4">
            {highlights.map(([title, desc]) => (
              <div key={title} className="flex items-center gap-3">
                <span className="h-9 w-9 shrink-0 rounded-full border border-tw-red flex items-center justify-center text-tw-red">✓</span>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-white/50">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/30">© 2026 Black Pearl Inc.</p>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Login" }]} />
          <div className="flex gap-6 border-b border-tw-border mb-8">
            <span className="pb-3 border-b-2 border-tw-red text-tw-red font-bold text-sm uppercase">
              Login
            </span>
            <Link href="/register" className="pb-3 text-tw-muted font-bold text-sm uppercase">
              Sign Up
            </Link>
          </div>

          <h2 className="text-2xl font-black text-tw-ink">Welcome Back!</h2>
          <p className="text-sm text-tw-muted mt-1">Login to your account to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-tw-ink">Email Address</label>
              <div className="mt-1.5">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-tw-ink">Password</label>
              <div className="mt-1.5">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>
            </div>

            {serverError && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{serverError}</p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-tw-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-tw-red font-semibold">
              Sign up here
            </Link>
          </p>

          <div className="mt-6 rounded-lg bg-tw-bg p-3 text-xs text-tw-muted text-center">
            Demo: admin@blackpearlinc.co.za · client@demo.thembile ·
            thabo.mokoena@pro.thembile — password Demo@1234
          </div>
        </div>
      </div>
    </div>
  );
}
