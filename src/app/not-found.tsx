import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Search,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex items-center justify-center overflow-hidden bg-[#F4F8FA] px-4 py-12">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#20B8C4]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#0B6F83]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-3xl border border-[#E1EAF0] bg-white px-6 py-10 text-center shadow-[0_20px_60px_rgba(16,42,67,0.08)] sm:px-12 sm:py-14">
          {/* Illustration */}
          <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-[#E6F5F7] to-[#D7EEF1] shadow-inner">
            <div className="absolute inset-3 rounded-[2rem] border border-white/70" />

            <BookOpen
              size={66}
              strokeWidth={1.5}
              className="relative z-10 text-[#0B6F83]"
            />

            <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-white bg-[#0B6F83] text-xl font-bold text-white shadow-md">
              ?
            </span>

            <Sparkles
              size={22}
              className="absolute -bottom-2 -left-3 text-[#20B8C4]"
            />

            <span className="absolute -right-5 bottom-5 h-3 w-3 rounded-full bg-[#20B8C4]" />
          </div>

          {/* Error Code */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D5EBEE] bg-[#EAF6F7] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0B6F83]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20B8C4]" />
            Error 404
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-[#102A43] sm:text-5xl">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#718096] sm:text-base">
            Looks like this page has gone missing from our library.
            The page you are looking for may have been moved or no
            longer exists.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B6F83] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0B6F83]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#07576B] hover:shadow-xl"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Home
            </Link>

            <Link
              href="/books"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE7EC] bg-white px-6 py-3.5 text-sm font-semibold text-[#263B50] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0B6F83] hover:bg-[#EAF6F7] hover:text-[#0B6F83]"
            >
              <Search size={18} />
              Explore Books
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-[#E8EEF2] pt-6">
            <p className="text-sm font-semibold text-[#102A43]">
              Book
              <span className="text-[#20B8C4]">Nook</span>
            </p>

            <p className="mt-2 text-xs text-[#94A3B8]">
              Your next favorite book is waiting.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}