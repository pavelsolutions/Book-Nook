"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validatePassword = (value: string) => {
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return "";
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validatePassword(password);

    if (error) {
      setPasswordError(error);
      return;
    }

    setPasswordError("");
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL || undefined,
      });

      if (result.error) {
        toast.error(
          result.error.message || "Registration failed. Please try again."
        );
        return;
      }

      toast.success("Registration successful!");
      router.push("/sign-in");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message || "Google authentication failed."
        );
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Google authentication failed.";

      toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FAFB] transition-colors duration-300 dark:bg-[#071D2B]">
      <div className="grid min-h-screen lg:grid-cols-1">
        {/* Signup Form Section */}
        <section className="flex min-h-screen items-center justify-center px-4 py-8 transition-colors duration-300 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#063047] transition-colors duration-300 dark:bg-[#20B8C4]">
                <UserPlus className="h-5 w-5 text-white dark:text-[#071D2B]" />
              </div>

              <span className="text-2xl font-bold tracking-tight text-[#063047] transition-colors duration-300 dark:text-[#E2EDF2]">
                BookNook
              </span>
            </Link>

            {/* Signup Card */}
            <Card className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(6,48,71,0.08)] transition-colors duration-300 dark:border-[#1E3A4A] dark:bg-[#102A3A]">
              <CardHeader className="space-y-3 px-6 pb-5 pt-7 sm:px-8 sm:pt-9">
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F6F8] transition-colors duration-300 dark:bg-[#103746]">
                  <UserPlus className="h-7 w-7 text-[#16A6B8] dark:text-[#20B8C4]" />
                </div>

                <CardTitle className="text-3xl font-bold tracking-tight text-[#063047] transition-colors duration-300 dark:text-[#E2EDF2]">
                  Create an account
                </CardTitle>

                <CardDescription className="text-sm leading-6 text-slate-500 transition-colors duration-300 dark:text-[#9FB4C2]">
                  Join BookNook and start exploring your next favorite book.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-7 sm:px-8 sm:pb-9">
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-[#063047] dark:text-[#B6C7D2]"
                    >
                      Full name
                    </Label>

                    <div className="relative">
                      <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#7893A3]" />

                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className="h-12 rounded-xl border-slate-200 bg-white pl-10 text-sm text-[#102A43] placeholder:text-slate-400 focus-visible:border-[#16A6B8] focus-visible:ring-[#16A6B8]/20 dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:placeholder:text-[#7893A3] dark:focus-visible:border-[#20B8C4]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-[#063047] dark:text-[#B6C7D2]"
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
                        className="h-12 rounded-xl border-slate-200 bg-white pl-10 text-sm text-[#102A43] placeholder:text-slate-400 focus-visible:border-[#16A6B8] focus-visible:ring-[#16A6B8]/20 dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:placeholder:text-[#7893A3] dark:focus-visible:border-[#20B8C4]"
                      />
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="photoURL"
                      className="text-sm font-semibold text-[#063047] dark:text-[#B6C7D2]"
                    >
                      Profile photo URL
                      <span className="ml-1 font-normal text-slate-400 dark:text-[#7893A3]">
                        (Optional)
                      </span>
                    </Label>

                    <Input
                      id="photoURL"
                      name="photoURL"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={photoURL}
                      onChange={(event) => setPhotoURL(event.target.value)}
                      className="h-12 rounded-xl border-slate-200 bg-white text-sm text-[#102A43] placeholder:text-slate-400 focus-visible:border-[#16A6B8] focus-visible:ring-[#16A6B8]/20 dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:placeholder:text-[#7893A3] dark:focus-visible:border-[#20B8C4]"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-[#063047] dark:text-[#B6C7D2]"
                    >
                      Password
                    </Label>

                    <div className="relative">
                      <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#7893A3]" />

                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => {
                          const value = event.target.value;

                          setPassword(value);
                          setPasswordError(validatePassword(value));
                        }}
                        required
                        className="h-12 rounded-xl border-slate-200 bg-white pl-10 pr-11 text-sm text-[#102A43] placeholder:text-slate-400 focus-visible:border-[#16A6B8] focus-visible:ring-[#16A6B8]/20 dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:placeholder:text-[#7893A3] dark:focus-visible:border-[#20B8C4]"
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

                    {passwordError && (
                      <p className="text-xs leading-5 text-red-500">
                        {passwordError}
                      </p>
                    )}

                    <p className="text-xs leading-5 text-slate-400 dark:text-[#9FB4C2]">
                      Use uppercase and lowercase letters, with at least 6
                      characters.
                    </p>
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    disabled={
                      loading || googleLoading || Boolean(passwordError)
                    }
                    className="h-12 w-full rounded-xl bg-[#063047] text-sm font-semibold text-white shadow-lg shadow-[#063047]/10 transition hover:bg-[#0A465F] disabled:opacity-60 dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#63D5DF]"
                  >
                    {loading ? (
                      "Creating account..."
                    ) : (
                      <>
                        Create account
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
                    <span className="bg-white px-3 font-medium tracking-wider text-slate-400 transition-colors duration-300 dark:bg-[#102A3A] dark:text-[#9FB4C2]">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Signup */}
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading || googleLoading}
                  onClick={handleGoogleSignup}
                  className="h-12 w-full rounded-xl border-slate-200 bg-white text-sm font-semibold text-[#063047] transition hover:bg-slate-50 dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E2EDF2] dark:hover:border-[#20B8C4] dark:hover:bg-[#103746]"
                >
                  <GoogleIcon />

                  <span className="ml-2">
                    {googleLoading
                      ? "Connecting to Google..."
                      : "Continue with Google"}
                  </span>
                </Button>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-slate-500 dark:text-[#9FB4C2]">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-semibold text-[#0B899B] transition hover:text-[#063047] hover:underline dark:text-[#20B8C4] dark:hover:text-[#63D5DF]"
                  >
                    Login
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
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