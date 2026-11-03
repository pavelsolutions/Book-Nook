
import Link from "next/link";
import { BookOpen, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-12">
      <div className="w-full max-w-xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-indigo-100">
          <BookOpen size={64} className="text-indigo-600" />

          <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600">
            ?
          </span>
        </div>

        {/* Error Code */}
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-600">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-500 sm:text-lg">
          Looks like this page has gone missing from our library.
          The page you are looking for may have been moved or no longer exists.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Search size={18} />
            Explore Books
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-400">
          BookNook — Your next favorite book is waiting.
        </p>
      </div>
    </main>
  );
}
