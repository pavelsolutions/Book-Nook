
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  BookMarked,
  Users,
  Clock,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";

type Book = {
  _id: string;
  title: string;
  author?: string;
  userEmail?: string;
  addedBy?: string;
  createdAt?: string;
};

type Borrow = {
  _id: string;
  bookTitle?: string;
  title?: string;
  author?: string;
  userEmail?: string;
  status?: string;
  createdAt?: string;
  dueDate?: string;
  returnDate?: string;
};

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const isBorrowed = (borrow: Borrow) =>
  ["borrowed", "active", "pending"].includes(
    borrow.status?.toLowerCase() ?? ""
  );

const isPendingReturn = (borrow: Borrow) => {
  if (!isBorrowed(borrow)) return false;

  if (!borrow.dueDate) return true;

  return new Date(borrow.dueDate).getTime() <= Date.now();
};

const formatDate = (date?: string) => {
  if (!date) return "Recently";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Recently";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const userEmail = session?.user?.email ?? "";

  const [books, setBooks] = useState<Book[]>([]);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionLoading) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [booksResponse, borrowsResponse] = await Promise.all([
          fetch(`${API_URL}/books`),
          fetch(
            `${API_URL}/my-borrows/${encodeURIComponent(userEmail)}`
          ),
        ]);

        if (!booksResponse.ok) {
          throw new Error("Could not load books.");
        }

        if (!borrowsResponse.ok) {
          throw new Error("Could not load borrowed books.");
        }

        const booksData: Book[] = await booksResponse.json();
        const borrowsData: Borrow[] = await borrowsResponse.json();

        setBooks(Array.isArray(booksData) ? booksData : []);
        setBorrows(Array.isArray(borrowsData) ? borrowsData : []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Unable to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userEmail, sessionLoading]);

  const myBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.userEmail === userEmail || book.addedBy === userEmail
    );
  }, [books, userEmail]);

  const activeBorrows = useMemo(
    () => borrows.filter(isBorrowed),
    [borrows]
  );

  const pendingReturns = useMemo(
    () => borrows.filter(isPendingReturn),
    [borrows]
  );

  const recentActivity = useMemo(() => {
    return [...borrows]
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      )
      .slice(0, 3);
  }, [borrows]);

  const stats = [
    {
      title: "Total Books",
      value: books.length.toLocaleString(),
      change: "Library collection",
      description: "Books available in the library",
      icon: BookOpen,
      iconBg: "bg-[#E6F5F7]",
      iconColor: "text-[#0B6F83]",
    },
    {
      title: "My Books",
      value: myBooks.length.toString().padStart(2, "0"),
      change: "My collection",
      description: "Books added by you",
      icon: BookMarked,
      iconBg: "bg-[#EAF1F8]",
      iconColor: "text-[#426A91]",
    },
    {
      title: "Borrowed Books",
      value: activeBorrows.length.toString().padStart(2, "0"),
      change: "Currently active",
      description: "Books currently borrowed",
      icon: Users,
      iconBg: "bg-[#E8F5EF]",
      iconColor: "text-[#368466]",
    },
    {
      title: "Pending Returns",
      value: pendingReturns.length.toString().padStart(2, "0"),
      change: "Due or overdue",
      description: "Books to return",
      icon: Clock,
      iconBg: "bg-[#FFF3E8]",
      iconColor: "text-[#D88745]",
    },
  ];

  const quickActions = [
    {
      title: "Add a new book",
      description: "Expand your collection",
      icon: Plus,
      iconBg: "bg-[#0B6F83]",
      background: "bg-[#EAF6F7]",
      path: "/dashboard/add-book",
    },
    {
      title: "Browse my books",
      description: "Explore your collection",
      icon: BookMarked,
      iconBg: "bg-[#426A91]",
      background: "bg-[#EDF3F9]",
      path: "/dashboard/my-books",
    },
    {
      title: "Manage borrowings",
      description: "Track borrowed books",
      icon: CalendarDays,
      iconBg: "bg-[#368466]",
      background: "bg-[#EAF5EF]",
      path: "/my-borrows",
    },
  ];

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FA]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#D5E9EC] border-t-[#0B6F83]" />
          <p className="mt-4 text-sm text-[#718096]">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FA] px-4">
        <div className="rounded-2xl border border-[#E1EAF0] bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#102A43]">
            Please sign in
          </h2>
          <p className="mt-2 text-sm text-[#718096]">
            Sign in to view your personal dashboard.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-5 rounded-xl bg-[#0B6F83] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#07576B]"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F8FA] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Header */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[#0B6F83]">
              <Sparkles size={15} />
              Your personal library
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#102A43] sm:text-3xl">
              Welcome back, {session?.user?.name || "Reader"}!
              <span className="ml-2">👋</span>
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#718096] sm:text-base">
              Here&apos;s what&apos;s happening with your library today.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/add-book")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B6F83] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B6F83]/15 transition hover:-translate-y-0.5 hover:bg-[#07576B]"
          >
            <Plus size={18} />
            Add New Book
          </button>
        </section>

        {/* Error Message */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-[#E1EAF0] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#102A43]/5"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <span className="rounded-full bg-[#EAF5EF] px-2.5 py-1 text-xs font-semibold text-[#368466]">
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-[#718096]">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#102A43]">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-[#94A3B8]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Recent Activity */}
          <div className="rounded-2xl border border-[#E1EAF0] bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#102A43]">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-[#718096]">
                  Your latest borrowing activities
                </p>
              </div>

              <button
                onClick={() => router.push("/my-borrows")}
                className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#0B6F83] transition hover:text-[#07576B]"
              >
                View all
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#D9E6EC] py-10 text-center">
                  <BookOpen className="mx-auto text-[#94A3B8]" size={28} />
                  <p className="mt-3 text-sm font-medium text-[#263B50]">
                    No recent activity
                  </p>
                  <p className="mt-1 text-xs text-[#718096]">
                    Your borrowed books will appear here.
                  </p>
                </div>
              ) : (
                recentActivity.map((borrow) => {
                  const status = borrow.status ?? "Borrowed";
                  const title =
                    borrow.bookTitle || borrow.title || "Untitled book";

                  const statusClass = isBorrowed(borrow)
                    ? "bg-[#EAF6F7] text-[#0B6F83]"
                    : "bg-[#EAF5EF] text-[#368466]";

                  return (
                    <div
                      key={borrow._id}
                      className="flex items-center gap-4 rounded-xl border border-[#EDF2F5] p-3 transition hover:border-[#CDE5E9] hover:bg-[#F8FBFC]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E6F5F7] text-[#0B6F83]">
                        <BookOpen size={22} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-[#263B50]">
                          {title}
                        </h3>

                        <p className="mt-1 text-xs text-[#718096]">
                          {borrow.author || "BookNook Library"}
                        </p>

                        <div className="mt-2 flex items-center gap-2 sm:hidden">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClass}`}
                          >
                            {status}
                          </span>

                          <span className="text-[11px] text-[#94A3B8]">
                            {formatDate(borrow.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="hidden text-right sm:block">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
                        >
                          {status}
                        </span>

                        <p className="mt-2 text-xs text-[#94A3B8]">
                          {formatDate(borrow.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-[#E1EAF0] bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-[#102A43]">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-[#718096]">
                Manage your library faster
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    onClick={() => router.push(action.path)}
                    className={`group flex w-full items-center gap-3 rounded-xl ${action.background} p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.iconBg} text-white shadow-sm`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#263B50]">
                        {action.title}
                      </p>

                      <p className="mt-1 text-xs text-[#718096]">
                        {action.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="shrink-0 text-[#8AA0AE] transition group-hover:translate-x-1 group-hover:text-[#0B6F83]"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reading Insight */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B6F83] to-[#087D91] p-6 text-white shadow-lg shadow-[#0B6F83]/15 sm:p-8">
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#C9F1F3]">
                <TrendingUp size={18} />
                <span className="text-sm font-medium">
                  Your Reading Insight
                </span>
              </div>

              <h2 className="text-xl font-bold sm:text-2xl">
                Keep your reading streak alive!
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                You currently have {activeBorrows.length} active borrowed{" "}
                {activeBorrows.length === 1 ? "book" : "books"}. Read a little
                every day and keep building your knowledge.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-4xl backdrop-blur-sm">
              📚
            </div>
          </div>

          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[25px] border-white/5" />

          <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-[#20B8C4]/10 blur-xl" />
        </section>
      </div>
    </div>
  );
}
