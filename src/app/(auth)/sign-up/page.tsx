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

  // Password validation
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

  // Email registration
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();



    const formData = new FormData(event.currentTarget);
    const newUser = Object.fromEntries(formData.entries());

    console.log(newUser);

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

  // Google authentication
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
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Brand Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#171923] p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

          <Link
            href="/"
            className="relative z-10 flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <UserPlus className="h-5 w-5" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              BookNook
            </span>
          </Link>

          <div className="relative z-10 max-w-lg">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="mr-2 h-2 w-2 rounded-full bg-violet-400" />
              Your next chapter starts here
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Discover stories.
              <br />
              <span className="text-violet-300">
                Build your library.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/60">
              Create your account and explore a world of books.
              Save your favorites and make reading a part of your
              everyday life.
            </p>

            <div className="mt-12 flex items-end gap-4">
              <div className="flex h-36 w-24 rotate-[-8deg] items-end rounded-lg bg-gradient-to-br from-amber-200 to-orange-400 p-3 shadow-xl">
                <span className="text-xs font-bold text-orange-950">
                  THE ART
                  <br />
                  OF STORIES
                </span>
              </div>

              <div className="flex h-44 w-28 rotate-[3deg] items-end rounded-lg bg-gradient-to-br from-violet-300 to-indigo-600 p-3 shadow-xl">
                <span className="text-xs font-bold text-white">
                  FIND
                  <br />
                  YOURSELF
                </span>
              </div>

              <div className="flex h-32 w-24 rotate-[8deg] items-end rounded-lg bg-gradient-to-br from-emerald-200 to-teal-600 p-3 shadow-xl">
                <span className="text-xs font-bold text-emerald-950">
                  NEW
                  <br />
                  WORLDS
                </span>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-white/40">
            © 2026 BookNook. Made for book lovers.
          </p>
        </section>

        {/* Signup Form Section */}
        <section className="flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-2 lg:hidden"
            >
              <UserPlus className="h-6 w-6 text-violet-600" />

              <span className="text-xl font-bold tracking-tight">
                BookNook
              </span>
            </Link>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="space-y-2 pb-6">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                  <UserPlus className="h-6 w-6 text-violet-600" />
                </div>

                <CardTitle className="text-3xl font-bold tracking-tight">
                  Create an account
                </CardTitle>

                <CardDescription>
                  Register to start exploring BookNook.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>

                    <div className="relative">
                      <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        required
                        className="h-11 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        required
                        className="h-11 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="space-y-2">
                    <Label htmlFor="photoURL">
                      Photo URL
                      <span className="ml-1 text-muted-foreground">
                        (Optional)
                      </span>
                    </Label>

                    <Input
                      id="photoURL"
                      name="photoURL"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={photoURL}
                      onChange={(event) =>
                        setPhotoURL(event.target.value)
                      }
                      className="h-11 rounded-xl"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

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
                        className="h-11 rounded-xl pl-10 pr-11"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {passwordError && (
                      <p className="text-sm text-destructive">
                        {passwordError}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Must contain uppercase and lowercase letters,
                      and be at least 6 characters.
                    </p>
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      googleLoading ||
                      Boolean(passwordError)
                    }
                    className="h-11 w-full rounded-xl bg-violet-600 font-semibold hover:bg-violet-700"
                  >
                    {loading ? (
                      "Creating account..."
                    ) : (
                      <>
                        Register
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Google Signup */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>

                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  disabled={loading || googleLoading}
                  onClick={handleGoogleSignup}
                  className="h-11 w-full rounded-xl"
                >
                  <GoogleIcon />

                  {googleLoading
                    ? "Connecting to Google..."
                    : "Continue with Google"}
                </Button>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-violet-600 hover:underline"
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