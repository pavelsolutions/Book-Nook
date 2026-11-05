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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4F8FA] px-4 py-12 transition-colors duration-300 dark:bg-[#0B1724]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#20B8C4]/10 blur-3xl dark:bg-[#20B8C4]/5" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#0B6F83]/10 blur-3xl dark:bg-[#0B6F83]/10" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-3xl border border-[#E1EAF0] bg-white px-6 py-10 text-center shadow-[0_20px_60px_rgba(16,42,67,0.08)] transition-colors duration-300 sm:px-12 sm:py-14 dark:border-[#243746] dark:bg-[#132333] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          {/* Illustration */}
          <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-[#E6F5F7] to-[#D7EEF1] shadow-inner dark:from-[#193B49] dark:to-[#1B3445]">
            <div className="absolute inset-3 rounded-[2rem] border border-white/70 dark:border-white/10" />

            <BookOpen
              size={66}
              strokeWidth={1.5}
              className="relative z-10 text-[#0B6F83] dark:text-[#20B8C4]"
            />

            <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-white bg-[#0B6F83] text-xl font-bold text-white shadow-md dark:border-[#132333] dark:bg-[#20B8C4] dark:text-[#0B1724]">
              ?
            </span>

            <Sparkles
              size={22}
              className="absolute -bottom-2 -left-3 text-[#20B8C4]"
            />

            <span className="absolute -right-5 bottom-5 h-3 w-3 rounded-full bg-[#20B8C4]" />
          </div>

          {/* Error Code */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D5EBEE] bg-[#EAF6F7] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0B6F83] dark:border-[#28515D] dark:bg-[#193B49] dark:text-[#70DCE4]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20B8C4]" />
            Error 404
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-[#102A43] transition-colors duration-300 sm:text-5xl dark:text-[#F1F5F9]">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#718096] transition-colors duration-300 sm:text-base dark:text-[#A7B6C5]">
            Looks like this page has gone missing from our library.
            The page you are looking for may have been moved or no
            longer exists.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B6F83] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0B6F83]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#07576B] hover:shadow-xl dark:bg-[#20B8C4] dark:text-[#0B1724] dark:shadow-[#20B8C4]/10 dark:hover:bg-[#70DCE4]"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Home
            </Link>

            <Link
              href="/books"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE7EC] bg-white px-6 py-3.5 text-sm font-semibold text-[#263B50] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0B6F83] hover:bg-[#EAF6F7] hover:text-[#0B6F83] dark:border-[#304657] dark:bg-[#182B3B] dark:text-[#D7E3EC] dark:hover:border-[#20B8C4] dark:hover:bg-[#193B49] dark:hover:text-[#70DCE4]"
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
          <div className="mt-10 border-t border-[#E8EEF2] pt-6 transition-colors duration-300 dark:border-[#2A3D4D]">
            <p className="text-sm font-semibold text-[#102A43] dark:text-[#F1F5F9]">
              Book
              <span className="text-[#20B8C4]">Nook</span>
            </p>

            <p className="mt-2 text-xs text-[#94A3B8] dark:text-[#7F91A3]">
              Your next favorite book is waiting.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}