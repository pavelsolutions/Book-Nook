"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LibraryBig,
  Sparkles,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    eyebrow: "Discover BookNook",
    title: "Get Your New",
    highlight: "Book Collections",
    description:
      "Find your next favorite book from our growing collection. Explore inspiring stories, discover new ideas, and make every reading moment meaningful.",
    books: [
      { name: "STORIES", color: "#0B6F83", spine: "#064B5B" },
      { name: "KNOWLEDGE", color: "#20B8C4", spine: "#0B6F83" },
      { name: "DISCOVER", color: "#102A43", spine: "#071B2C" },
    ],
  },
  {
    id: 2,
    eyebrow: "Explore New Stories",
    title: "Every Page Opens",
    highlight: "A New World",
    description:
      "From timeless classics to exciting new stories, discover books that inspire, educate, and entertain. Your next adventure is waiting.",
    books: [
      { name: "CLASSICS", color: "#102A43", spine: "#071B2C" },
      { name: "ADVENTURE", color: "#0B6F83", spine: "#064B5B" },
      { name: "IMAGINATION", color: "#20B8C4", spine: "#0B6F83" },
    ],
  },
  {
    id: 3,
    eyebrow: "Your Reading Journey",
    title: "Read More. Learn",
    highlight: "Grow More.",
    description:
      "Build your reading habit with BookNook. Discover new knowledge, borrow your favorite books, and make every page count.",
    books: [
      { name: "LEARN", color: "#20B8C4", spine: "#0B6F83" },
      { name: "GROW", color: "#102A43", spine: "#071B2C" },
      { name: "READ", color: "#0B6F83", spine: "#064B5B" },
    ],
  },
];

type Book = {
  name: string;
  color: string;
  spine: string;
};

function BookArtwork({ books }: { books: Book[] }) {
  const bookHeights = ["h-48", "h-56", "h-52"];
  const bookRotations = ["-rotate-6", "rotate-2", "rotate-6"];

  return (
    <div className="relative mx-auto flex h-[280px] w-full max-w-[500px] items-center justify-center sm:h-[340px] lg:h-[430px]">
      {/* Decorative background */}
      <div className="absolute right-8 top-8 size-64 rounded-full bg-[#20B8C4]/10 blur-3xl sm:size-80" />

      <div className="absolute bottom-8 left-8 size-48 rounded-full bg-[#0B6F83]/10 blur-3xl" />

      <div className="absolute right-10 top-10 size-16 rotate-12 rounded-2xl border border-[#20B8C4]/20" />

      <div className="absolute bottom-12 left-8 size-12 rounded-full bg-[#20B8C4]/15" />

      <Sparkles className="absolute right-16 top-16 size-7 text-[#20B8C4]" />

      <Sparkles className="absolute left-12 top-24 size-5 text-[#0B6F83]/50" />

      {/* Book platform */}
      <div className="absolute bottom-10 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full bg-[#102A43]/10 blur-md dark:bg-black/30" />

      {/* Books */}
      <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-4">
        {books.map((book, index) => (
          <div
            key={book.name}
            className={`relative ${bookHeights[index]} w-20 rounded-r-lg shadow-xl sm:w-28 ${bookRotations[index]}`}
            style={{
              backgroundColor: book.color,
              zIndex: index + 1,
            }}
          >
            {/* Book spine */}
            <div
              className="absolute left-0 top-0 h-full w-3 rounded-l-md"
              style={{ backgroundColor: book.spine }}
            />

            {/* Book cover */}
            <div className="absolute inset-x-4 bottom-5 top-5 flex flex-col items-center justify-center border-y border-white/20 text-center">
              <BookOpen className="mb-3 size-7 text-white/90" />

              <span className="text-[9px] font-bold tracking-widest text-white sm:text-xs">
                BOOKNOOK
              </span>

              <span className="mt-2 text-[8px] font-medium text-white/70 sm:text-[10px]">
                {book.name}
              </span>
            </div>

            {/* Book pages */}
            <div className="absolute -right-1 top-1 h-[calc(100%-8px)] w-1 rounded-r-sm bg-[#F4F8FA] dark:bg-[#DCE7EA]" />
          </div>
        ))}
      </div>

      {/* Floating library card */}
      <div className="absolute bottom-5 right-0 z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-3 py-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#102A43]/95 sm:bottom-8 sm:right-4 sm:px-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#0B6F83] dark:bg-[#0B6F83]/30 dark:text-[#20B8C4] sm:size-12">
          <LibraryBig className="size-6" />
        </div>

        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explore
          </p>

          <p className="text-sm font-bold text-[#102A43] dark:text-white">
            Your Library
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Banner() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-[#F4F8FA] py-5 transition-colors duration-300 dark:bg-[#031F2C] sm:py-8">
      {/* Fixed shared width */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-[700px] overflow-hidden rounded-[28px] border border-white bg-gradient-to-br from-white via-[#F7FBFC] to-[#E5F6F8] shadow-lg shadow-[#102A43]/5 transition-colors duration-300 dark:border-white/10 dark:from-[#063047] dark:via-[#082C40] dark:to-[#0B4355] dark:shadow-black/20 sm:h-[650px] sm:rounded-[36px] lg:h-[600px]">
          {/* Background accents */}
          <div className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full bg-[#20B8C4]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-[#0B6F83]/5 blur-3xl dark:bg-[#20B8C4]/10" />

          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop
            speed={650}
            className="booknook-swiper h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="h-full">
                <div className="grid h-full grid-cols-1 items-center gap-2 px-6 pb-12 pt-8 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-14 xl:px-16">
                  {/* Left content */}
                  <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
                    {/* Brand */}
                    <Link
                      href="/"
                      className="mb-5 inline-flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                    >
                      <span className="flex size-11 items-center justify-center rounded-xl bg-[#0B6F83] text-white shadow-md shadow-[#0B6F83]/20">
                        <BookOpen className="size-6" />
                      </span>

                      <span className="text-2xl font-extrabold tracking-tight text-[#102A43] dark:text-white">
                        BookNook
                      </span>

                      <span className="rounded-full border border-[#20B8C4]/20 bg-white/80 px-4 py-2 text-xs font-semibold text-[#0B6F83] dark:border-[#20B8C4]/30 dark:bg-white/5 dark:text-[#20B8C4] sm:text-sm">
                        {slide.eyebrow}
                      </span>
                    </Link>

                    {/* Heading */}
                    <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[#102A43] dark:text-white sm:text-5xl lg:text-6xl">
                      {slide.title}

                      <span className="mt-2 block text-[#0B6F83] dark:text-[#20B8C4]">
                        {slide.highlight}
                      </span>
                    </h1>

                    {/* Accent line */}
                    <div className="mx-auto mt-5 h-1.5 w-16 rounded-full bg-[#20B8C4] lg:mx-0" />

                    {/* Description */}
                    <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg">
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                      <Link
                        href="/books"
                        className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#0B6F83] px-7 text-sm font-bold text-white shadow-lg shadow-[#0B6F83]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#102A43] dark:hover:bg-[#20B8C4] dark:hover:text-[#063047] sm:h-14 sm:px-8 sm:text-base"
                      >
                        Browse Books

                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href="/about"
                        className="inline-flex h-12 items-center rounded-full border border-[#0B6F83]/20 bg-white/80 px-6 text-sm font-semibold text-[#102A43] transition hover:border-[#0B6F83] hover:bg-[#E5F6F8] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-[#20B8C4] dark:hover:bg-[#20B8C4]/10 sm:h-14 sm:px-7 sm:text-base"
                      >
                        Learn More
                      </Link>
                    </div>

                    {/* Small detail */}
                    <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400 lg:justify-start">
                      <span className="flex -space-x-2">
                        <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#0B6F83] text-[10px] text-white dark:border-[#063047]">
                          B
                        </span>

                        <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#20B8C4] text-[10px] text-white dark:border-[#063047]">
                          N
                        </span>

                        <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#102A43] text-[10px] text-white dark:border-[#063047]">
                          +
                        </span>
                      </span>

                      <span>Stories worth discovering</span>
                    </div>
                  </div>

                  {/* Right artwork */}
                  <div className="relative order-1 lg:order-2">
                    <BookArtwork books={slide.books} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-[#102A43] shadow-lg transition hover:bg-[#0B6F83] hover:text-white dark:border-white/10 dark:bg-[#102A43]/90 dark:text-white dark:hover:bg-[#20B8C4] dark:hover:text-[#063047] md:flex"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-[#102A43] shadow-lg transition hover:bg-[#0B6F83] hover:text-white dark:border-white/10 dark:bg-[#102A43]/90 dark:text-white dark:hover:bg-[#20B8C4] dark:hover:text-[#063047] md:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Pagination styles */}
      <style jsx global>{`
        .booknook-swiper .swiper-pagination {
          bottom: 18px !important;
        }

        .booknook-swiper .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: #0b6f83;
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .dark .booknook-swiper .swiper-pagination-bullet {
          background: #20b8c4;
        }

        .booknook-swiper .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 999px;
          background: #0b6f83;
          opacity: 1;
        }

        .dark .booknook-swiper .swiper-pagination-bullet-active {
          background: #20b8c4;
        }
      `}</style>
    </section>
  );
}