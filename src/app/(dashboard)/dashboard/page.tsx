"use client";

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
  LibraryBig,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Books",
    value: "1,248",
    change: "+12.5%",
    description: "Compared to last month",
    icon: BookOpen,
    iconBg: "bg-[#E6F5F7]",
    iconColor: "text-[#0B6F83]",
  },
  {
    title: "My Books",
    value: "24",
    change: "+4",
    description: "Books in your collection",
    icon: BookMarked,
    iconBg: "bg-[#EAF1F8]",
    iconColor: "text-[#426A91]",
  },
  {
    title: "Borrowed Books",
    value: "08",
    change: "2 due soon",
    description: "Currently borrowed",
    icon: Users,
    iconBg: "bg-[#E8F5EF]",
    iconColor: "text-[#368466]",
  },
  {
    title: "Pending Returns",
    value: "03",
    change: "View details",
    description: "Books to return",
    icon: Clock,
    iconBg: "bg-[#FFF3E8]",
    iconColor: "text-[#D88745]",
  },
];

const recentBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    status: "Reading",
    date: "Today",
    iconBg: "bg-[#FFF3E0]",
    iconColor: "text-[#C78A36]",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    status: "Borrowed",
    date: "Yesterday",
    iconBg: "bg-[#E8F5EF]",
    iconColor: "text-[#368466]",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    status: "Completed",
    date: "Oct 28, 2026",
    iconBg: "bg-[#E6F5F7]",
    iconColor: "text-[#0B6F83]",
  },
];

export default function DashboardPage() {
  const router = useRouter();

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
              Welcome back, Reader!
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
                  Your latest reading activities
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard/my-books")}
                className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#0B6F83] transition hover:text-[#07576B]"
              >
                View all
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {recentBooks.map((book) => (
                <div
                  key={book.title}
                  className="flex items-center gap-4 rounded-xl border border-[#EDF2F5] p-3 transition hover:border-[#CDE5E9] hover:bg-[#F8FBFC]"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${book.iconBg} ${book.iconColor}`}
                  >
                    <BookOpen size={22} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-[#263B50]">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-xs text-[#718096]">
                      {book.author}
                    </p>

                    <div className="mt-2 flex items-center gap-2 sm:hidden">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          book.status === "Completed"
                            ? "bg-[#EAF5EF] text-[#368466]"
                            : book.status === "Borrowed"
                              ? "bg-[#EAF6F7] text-[#0B6F83]"
                              : "bg-[#FFF3E8] text-[#D88745]"
                        }`}
                      >
                        {book.status}
                      </span>

                      <span className="text-[11px] text-[#94A3B8]">
                        {book.date}
                      </span>
                    </div>
                  </div>

                  <div className="hidden text-right sm:block">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        book.status === "Completed"
                          ? "bg-[#EAF5EF] text-[#368466]"
                          : book.status === "Borrowed"
                            ? "bg-[#EAF6F7] text-[#0B6F83]"
                            : "bg-[#FFF3E8] text-[#D88745]"
                      }`}
                    >
                      {book.status}
                    </span>

                    <p className="mt-2 text-xs text-[#94A3B8]">
                      {book.date}
                    </p>
                  </div>
                </div>
              ))}
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
                You have been making great progress. Read a little every
                day and keep building your knowledge.
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