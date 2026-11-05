import Link from "next/link";
import {
  Search,
  BookOpen,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Your Book",
    description:
      "Explore our library and discover a book that matches your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow & Enjoy",
    description:
      "Choose your favorite book, borrow it, and enjoy your reading journey.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Return with Care",
    description:
      "Return your book on time and make room for your next great read.",
    icon: RotateCcw,
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="relative overflow-hidden bg-[#F7FAFB] py-16 transition-colors duration-300 dark:bg-[#071D2B] lg:py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#16A6B8]/5 blur-3xl dark:bg-[#16A6B8]/10" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#063047]/5 blur-3xl dark:bg-[#20B8C4]/10" />

      {/* Content Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F6F8] px-4 py-2 text-sm font-semibold text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
            <BookOpen className="h-4 w-4" />
            Simple & Easy
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#063047] dark:text-white sm:text-4xl lg:text-5xl">
            How Borrowing{" "}
            <span className="text-[#16A6B8]">Works</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Your next favorite book is just a few simple steps away.
            Discover, borrow, and enjoy reading with BookNook.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16A6B8]/40 hover:shadow-xl dark:border-slate-700 dark:bg-[#102A3A] dark:hover:border-[#16A6B8]/50 sm:p-9"
              >
                {/* Step Number */}
                <div className="absolute right-7 top-7 text-5xl font-black text-[#063047]/5 transition-colors duration-300 group-hover:text-[#16A6B8]/10 dark:text-white/5 dark:group-hover:text-[#20B8C4]/10">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8] transition-all duration-300 group-hover:bg-[#16A6B8] group-hover:text-white dark:bg-[#103746] dark:text-[#20B8C4] dark:group-hover:bg-[#16A6B8] dark:group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="mt-7 text-xl font-bold text-[#063047] transition-colors group-hover:text-[#16A6B8] dark:text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>

                {/* Bottom Info */}
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#063047] dark:text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-[#16A6B8] dark:text-[#20B8C4]" />
                  <span>Easy and convenient</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-full bg-[#063047] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#063047]/15 transition-all hover:-translate-y-0.5 hover:bg-[#16A6B8] dark:bg-[#16A6B8] dark:shadow-[#16A6B8]/10 dark:hover:bg-[#20B8C4] sm:px-9"
          >
            Start Exploring
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}