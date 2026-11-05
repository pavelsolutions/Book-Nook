"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  BookOpen,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email and password login
  const handleSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome to BookNook!");

      window.location.replace("/");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleSignin = async () => {
    setGoogleLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "Google login failed.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Google login failed."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FAFB] transition-colors duration-300 dark:bg-[#071D2B]">
      <div className="grid min-h-screen lg:grid-cols-1">
        {/* Login Section */}
        <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#063047] transition-colors duration-300 dark:bg-[#20B8C4]">
                <BookOpen className="h-5 w-5 text-white dark:text-[#071D2B]" />
              </div>

              <span className="text-2xl font-bold tracking-tight text-[#063047] transition-colors duration-300 dark:text-[#E2EDF2]">
                BookNook
              </span>
            </Link>

            {/* Login Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-[#063047]/[0.06] transition-colors duration-300 dark:border-[#1E3A4A] dark:bg-[#102A3A] sm:p-9">
              {/* Card Header */}
              <div className="mb-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8] transition-colors duration-300 dark:bg-[#103746] dark:text-[#20B8C4]">
                  <BookOpen size={27} />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-[#063047] transition-colors duration-300 dark:text-[#E2EDF2]">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 transition-colors duration-300 dark:text-[#9FB4C2]">
                  Sign in to your BookNook account and pick up where you left
                  off.
                </p>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSignin} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700 dark:text-[#B6C7D2]"
                  >
                    Email address
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#7893A3]" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white pl-11 text-sm text-[#102A43] placeholder:text-slate-400 transition focus-visible:border-[#16A6B8] focus-visible:ring-[#16A6B8]/20 dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:placeholder:text-[#7893A3] dark:focus-visible:border-[#20B8C4]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700 dark:text-[#B6C7D2]"
                    >
                      Password
                    </Label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#087F8C] transition hover:text-[#063047] hover:underline dark:text-[#20B8C4] dark:hover:text-[#63D5DF]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#7893A3]" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white pl-11 pr-11 text-sm text-[#102A43] placeholder:text-slate-400 transition focus-visible:border-[#16A6B8] focus-visible:ring-[#16A6B8]/20 dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:placeholder:text-[#7893A3] dark:focus-visible:border-[#20B8C4]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#063047] dark:text-[#7893A3] dark:hover:text-[#20B8C4]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="h-12 w-full rounded-xl bg-[#063047] font-semibold text-white shadow-lg shadow-[#063047]/10 transition hover:bg-[#0B4962] disabled:opacity-60 dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#63D5DF]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100 dark:border-[#1E3A4A]" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 font-medium tracking-wide text-slate-400 transition-colors duration-300 dark:bg-[#102A3A] dark:text-[#9FB4C2]">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                disabled={loading || googleLoading}
                onClick={handleGoogleSignin}
                className="h-12 w-full rounded-xl border-slate-200 bg-white font-semibold text-slate-700 transition hover:border-[#16A6B8]/40 hover:bg-[#F7FAFB] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:hover:border-[#20B8C4] dark:hover:bg-[#103746]"
              >
                <GoogleIcon />

                {googleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </Button>

              {/* Register Link */}
              <p className="mt-7 text-center text-sm text-slate-500 transition-colors duration-300 dark:text-[#9FB4C2]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-bold text-[#087F8C] transition hover:text-[#063047] hover:underline dark:text-[#20B8C4] dark:hover:text-[#63D5DF]"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* Terms */}
            <p className="mt-6 text-center text-xs text-slate-400 transition-colors duration-300 dark:text-[#7893A3]">
              By continuing, you agree to BookNook&apos;s terms and privacy
              policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="mr-2 h-4 w-4"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.11 7.14-10.15 7.14-17.56z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.83 2.27-8.28 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}