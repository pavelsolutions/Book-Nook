import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";

const categories = [
  {
    name: "Fiction",
    subtitle: "Stories & Imagination",
    icon: "📚",
    bgColor: "bg-[#F4E7E5]",
    iconBg: "bg-[#EBD3D0]",
    accent: "#B66B63",
  },
  {
    name: "Science",
    subtitle: "Discover New Ideas",
    icon: "🔬",
    bgColor: "bg-[#F2FBEA]",
    iconBg: "bg-[#E2F1D4]",
    accent: "#6B9B50",
  },
  {
    name: "History",
    subtitle: "Explore the Past",
    icon: "🏛️",
    bgColor: "bg-[#F1FAFC]",
    iconBg: "bg-[#DCEFF3]",
    accent: "#4C91A2",
  },
  {
    name: "Kids",
    subtitle: "Books for Young Minds",
    icon: "🧸",
    bgColor: "bg-[#F8F0FC]",
    iconBg: "bg-[#EEDDF6]",
    accent: "#A477B7",
  },
  {
    name: "Others",
    subtitle: "More to Explore",
    icon: "✨",
    bgColor: "bg-[#F8F2E9]",
    iconBg: "bg-[#F0E3CF]",
    accent: "#B28B50",
  },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#F4F8FA] py-12 sm:py-16 lg:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#20B8C4]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#0B6F83]/5 blur-3xl" />

      {/* Content Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D5EBEE] bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B6F83]">
              <Sparkles size={14} />
              Explore Our Library
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#102A43] sm:text-4xl lg:text-[42px]">
              Browse by{" "}
              <span className="text-[#0B6F83]">Category</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#718096] sm:text-base">
              Discover your next favorite book from our carefully
              organized collections. There is a story for everyone.
            </p>
          </div>

          <Link
            href="/books"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-[#D5E5E9] bg-white px-4 py-3 text-sm font-semibold text-[#0B6F83] shadow-sm transition hover:border-[#0B6F83] hover:bg-[#EAF6F7]"
          >
            View all books

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/books?category=${encodeURIComponent(category.name)}`}
              className={`group relative flex min-h-[230px] flex-col overflow-hidden rounded-2xl border border-white/80 ${category.bgColor} p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#102A43]/8 sm:min-h-[250px] sm:p-6`}
            >
              {/* Decorative Circle */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/35 transition-transform duration-500 group-hover:scale-150" />

              {/* Card Content */}
              <div className="relative z-10 flex h-full flex-col">
                {/* Category Icon */}
                <div
                  className={`mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-2xl ${category.iconBg} text-4xl shadow-sm transition-all duration-300 group-hover:rotate-3 group-hover:scale-110`}
                >
                  {category.icon}
                </div>

                {/* Category Details */}
                <div className="mt-auto">
                  <h3 className="text-lg font-bold tracking-tight text-[#102A43] transition-colors duration-300 group-hover:text-[#0B6F83] sm:text-xl">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#718096] sm:text-sm">
                    {category.subtitle}
                  </p>

                  {/* Explore Link */}
                  <div className="mt-5 flex items-center justify-between">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: category.accent }}
                    >
                      Explore category
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#0B6F83] transition-all duration-300 group-hover:bg-[#0B6F83] group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[#8A9AA8]">
          <BookOpen size={15} className="text-[#0B6F83]" />

          Find a book that inspires your next chapter.
        </div>
      </div>
    </section>
  );
}