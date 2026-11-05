import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { Card } from "@/components/ui/card";

const categories = [
  {
    name: "Fiction",
    icon: "📖",
    description: "Stories that spark imagination",
    href: "/books?category=fiction",
    bg: "bg-[#F0FDF4]",
    border: "border-[#D1FAE5]",
    iconBg: "bg-[#DCFCE7]",
    text: "text-[#047857]",
  },
  {
    name: "Science",
    icon: "🔬",
    description: "Explore the world of science",
    href: "/books?category=science",
    bg: "bg-[#FFFBEB]",
    border: "border-[#FEF3C7]",
    iconBg: "bg-[#FEF3C7]",
    text: "text-[#B45309]",
  },
  {
    name: "History",
    icon: "🏛️",
    description: "Discover stories from the past",
    href: "/books?category=history",
    bg: "bg-[#FFF7ED]",
    border: "border-[#FFEDD5]",
    iconBg: "bg-[#FFEDD5]",
    text: "text-[#C2410C]",
  },
  {
    name: "Kids",
    icon: "🧸",
    description: "Fun reads for little readers",
    href: "/books?category=kids",
    bg: "bg-[#ECFEFF]",
    border: "border-[#CFFAFE]",
    iconBg: "bg-[#CFFAFE]",
    text: "text-[#0E7490]",
  },
  {
    name: "Others",
    icon: "✨",
    description: "Find your next favorite read",
    href: "/books?category=others",
    bg: "bg-[#EFF6FF]",
    border: "border-[#DBEAFE]",
    iconBg: "bg-[#DBEAFE]",
    text: "text-[#1D4ED8]",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#F4F8FA] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E5F6F8] px-4 py-2 text-sm font-medium text-[#0B6F83]">
            <BookOpen size={16} />
            <span>Explore our collection</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#102A43] sm:text-4xl">
            Popular Categories
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#718096] sm:text-base">
            Discover books from your favorite genres and find your next
            unforgettable read.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group block outline-none"
            >
              <Card
                className={`
                  relative flex h-full min-h-[190px] flex-col items-center
                  justify-center overflow-hidden rounded-2xl border
                  ${category.bg} ${category.border}
                  p-5 text-center shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1.5 hover:shadow-lg
                  focus-visible:ring-2 focus-visible:ring-[#0B6F83]
                  focus-visible:ring-offset-2
                `}
              >
                {/* Decorative circle */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/40 transition-transform duration-500 group-hover:scale-150" />

                {/* Icon */}
                <div
                  className={`
                    relative mb-4 flex h-16 w-16 items-center
                    justify-center rounded-2xl ${category.iconBg}
                    text-3xl shadow-sm transition-transform duration-300
                    group-hover:rotate-[-6deg] group-hover:scale-110
                  `}
                >
                  <span aria-hidden="true">{category.icon}</span>
                </div>

                {/* Category name */}
                <h3
                  className={`relative text-base font-bold ${category.text}`}
                >
                  {category.name}
                </h3>

                {/* Description */}
                <p className="relative mt-2 text-xs leading-5 text-[#718096]">
                  {category.description}
                </p>

                {/* Hover arrow */}
                <div
                  className={`
                    absolute right-3 top-3 flex h-7 w-7 items-center
                    justify-center rounded-full bg-white/70 ${category.text}
                    opacity-0 transition-all duration-300
                    group-hover:translate-x-0.5 group-hover:opacity-100
                  `}
                >
                  <ArrowUpRight size={15} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}