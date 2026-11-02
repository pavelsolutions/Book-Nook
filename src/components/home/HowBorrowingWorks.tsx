
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
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-[#176344]">
            <BookOpen className="size-4" />
            Simple & Easy
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#123e2c] sm:text-4xl lg:text-5xl">
            How Borrowing{" "}
            <span className="text-orange-500">Works</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Your next favorite book is just a few simple steps away.
            Discover, borrow, and enjoy reading with BookNook.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-[#e9eee7] bg-[#faf9f4] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-9"
              >
                {/* Step number */}
                <div className="absolute right-7 top-7 text-5xl font-black text-green-100 transition-colors group-hover:text-orange-100">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative flex size-16 items-center justify-center rounded-2xl bg-[#e8f1e7] text-[#176344] transition-colors group-hover:bg-orange-100 group-hover:text-orange-600">
                  <Icon className="size-7" />
                </div>

                <h3 className="mt-7 text-xl font-bold text-[#123e2c]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#176344]">
                  <CheckCircle2 className="size-4 text-orange-500" />
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
            className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Start Exploring
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
