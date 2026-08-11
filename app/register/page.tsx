"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";

const accountKinds = [
  { value: "client", label: "Client / Employee", desc: "I need labour law advice" },
  { value: "employer", label: "Employer / Organisation", desc: "Our business needs advice" },
  { value: "professional", label: "Labour Law Professional", desc: "I want to offer consultations" },
] as const;

const dashboardByKind: Record<string, string> = {
  client: "/dashboard",
  employer: "/dashboard",
  professional: "/professional",
};

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { accountKind: "client", agree: undefined as unknown as true },
  });

  const accountKind = watch("accountKind");

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setServerError(body.error ?? "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (signInRes?.error) {
      router.push("/login");
      return;
    }
    router.push(dashboardByKind[data.accountKind]);
    router.refresh();
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
      <div className="hidden lg:flex flex-col justify-between bg-tw-black diagonal-accent p-12">
        <Logo dark />
        <div>
          <h1 className="text-4xl font-black text-white leading-tight">
            Expert Advice. <br />
            <span className="text-tw-red">Fairer Workplaces.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-sm">
            Create an account to book consultations, manage bookings and access
            member-only resources.
          </p>
        </div>
        <p className="text-xs text-white/30">© 2026 Black Pearl Inc.</p>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-lg">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sign Up" }]} />
          <div className="flex gap-6 border-b border-tw-border mb-8">
            <Link href="/login" className="pb-3 text-tw-muted font-bold text-sm uppercase">
              Login
            </Link>
            <span className="pb-3 border-b-2 border-tw-red text-tw-red font-bold text-sm uppercase">
              Sign Up
            </span>
          </div>

          <h2 className="text-2xl font-black text-tw-ink">Create Your Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-tw-ink">First name</label>
                <div className="mt-1.5">
                  <Input placeholder="First name" error={errors.firstName?.message} {...register("firstName")} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-tw-ink">Last name</label>
                <div className="mt-1.5">
                  <Input placeholder="Last name" error={errors.lastName?.message} {...register("lastName")} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-tw-ink">Email address</label>
              <div className="mt-1.5">
                <Input type="email" placeholder="Enter your email address" error={errors.email?.message} {...register("email")} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-tw-ink">Phone number</label>
              <div className="mt-1.5">
                <Input placeholder="Enter your phone number" error={errors.phone?.message} {...register("phone")} />
              </div>
            </div>

            {accountKind === "employer" && (
              <div>
                <label className="text-sm font-medium text-tw-ink">Organisation</label>
                <div className="mt-1.5">
                  <Input placeholder="Company name" {...register("organisation")} />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-tw-ink">Password</label>
              <div className="mt-1.5">
                <Input type="password" placeholder="Create a strong password" error={errors.password?.message} {...register("password")} />
              </div>
              <ul className="mt-2 grid grid-cols-2 gap-1 text-xs text-tw-muted">
                <li>✓ At least 8 characters</li>
                <li>✓ Include an uppercase letter</li>
                <li>✓ Include a number</li>
                <li>✓ Include a special character</li>
              </ul>
            </div>

            <div>
              <label className="text-sm font-medium text-tw-ink">I am signing up as a</label>
              <div className="mt-1.5 grid sm:grid-cols-3 gap-3">
                {accountKinds.map((k) => (
                  <button
                    key={k.value}
                    type="button"
                    onClick={() => setValue("accountKind", k.value)}
                    className={`rounded-lg border p-3 text-left text-sm ${
                      accountKind === k.value
                        ? "border-tw-red bg-tw-red/5 text-tw-ink"
                        : "border-tw-border text-tw-muted"
                    }`}
                  >
                    <div className="font-semibold">{k.label}</div>
                    <div className="text-xs">{k.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-tw-muted">
              <input type="checkbox" className="mt-0.5" {...register("agree")} />
              <span>
                I agree to the <span className="text-tw-red">Terms & Conditions</span> and{" "}
                <span className="text-tw-red">Privacy Policy</span>
              </span>
            </label>
            {errors.agree && <p className="text-xs text-red-600">{errors.agree.message}</p>}

            {serverError && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{serverError}</p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create My Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-tw-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-tw-red font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
