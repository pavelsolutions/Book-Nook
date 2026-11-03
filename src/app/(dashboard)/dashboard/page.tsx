import {
  BookOpen,
  BookMarked,
  Users,
  Clock,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Total Books",
    value: "1,248",
    change: "+12.5%",
    description: "Compared to last month",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "My Books",
    value: "24",
    change: "+4",
    description: "Books in your collection",
    icon: BookMarked,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Borrowed Books",
    value: "08",
    change: "2 due soon",
    description: "Currently borrowed",
    icon: Users,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Pending Returns",
    value: "03",
    change: "View details",
    description: "Books to return",
    icon: Clock,
    color: "bg-orange-100 text-orange-600",
  },
];

const recentBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    status: "Reading",
    date: "Today",
    color: "bg-amber-100",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    status: "Borrowed",
    date: "Yesterday",
    color: "bg-emerald-100",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    status: "Completed",
    date: "Oct 28, 2026",
    color: "bg-blue-100",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Header */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Tuesday, November 3, 2026
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, Reader! 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Here&apos;s what&apos;s happening with your library today.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700">
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
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your latest reading activities
                </p>
              </div>

              <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                View all
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {recentBooks.map((book) => (
                <div
                  key={book.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${book.color}`}
                  >
                    <BookOpen className="text-slate-700" size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {book.author}
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        book.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : book.status === "Borrowed"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {book.status}
                    </span>
                    <p className="mt-2 text-xs text-slate-400">{book.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your library faster
            </p>

            <div className="mt-6 space-y-3">
              <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 p-4 text-left transition hover:bg-indigo-100">
                <div className="rounded-lg bg-indigo-600 p-2 text-white">
                  <Plus size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Add a new book
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Expand your collection
                  </p>
                </div>
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl bg-emerald-50 p-4 text-left transition hover:bg-emerald-100">
                <div className="rounded-lg bg-emerald-600 p-2 text-white">
                  <BookMarked size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Browse my books
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Explore your collection
                  </p>
                </div>
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl bg-orange-50 p-4 text-left transition hover:bg-orange-100">
                <div className="rounded-lg bg-orange-500 p-2 text-white">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Manage borrowings
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Track borrowed books
                  </p>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Reading Insight */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-indigo-100">
                <TrendingUp size={18} />
                <span className="text-sm font-medium">
                  Your Reading Insight
                </span>
              </div>

              <h2 className="text-xl font-bold sm:text-2xl">
                Keep your reading streak alive!
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
                You have been making great progress. Read a little every day
                and keep building your knowledge.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-4xl">
              📚
            </div>
          </div>

          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/10" />
        </section>
      </div>
    </div>
  );
}