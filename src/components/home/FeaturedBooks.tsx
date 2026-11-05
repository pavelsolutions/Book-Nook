"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

import { IBook } from "@/types/types";

export default function FeaturedBooks() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleBooks, setVisibleBooks] = useState(2);
  const [loading, setLoading] = useState(true);

  // Fetch all books from backend
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();

        const allBooks: IBook[] = Array.isArray(result)
          ? result
          : result.data ?? result.books ?? [];

        setBooks(allBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // Responsive visible books
  useEffect(() => {
    function updateVisibleBooks() {
      if (window.innerWidth >= 1024) {
        setVisibleBooks(5);
      } else if (window.innerWidth >= 640) {
        setVisibleBooks(3);
      } else {
        setVisibleBooks(2);
      }
    }

    updateVisibleBooks();
    window.addEventListener("resize", updateVisibleBooks);

    return () => {
      window.removeEventListener("resize", updateVisibleBooks);
    };
  }, []);

  const maxIndex = Math.max(0, books.length - visibleBooks);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Keep index valid when screen size changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  if (loading) {
    return (
      <section className="bg-white py-14 transition-colors duration-300 dark:bg-[#071D2B] sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#063047] dark:text-white sm:text-4xl">
            Featured Books
          </h2>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Loading books...
          </p>
        </div>
      </section>
    );
  }

  if (!books.length) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white py-14 transition-colors duration-300 dark:bg-[#071D2B] sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#16A6B8]">
              Handpicked for You
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#063047] dark:text-white sm:text-4xl">
              Featured Books
            </h2>

            <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Explore some of the most interesting books in our library.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              aria-label="Previous books"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#063047] transition hover:border-[#16A6B8] hover:bg-[#16A6B8] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              aria-label="Next books"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#063047] transition hover:border-[#16A6B8] hover:bg-[#16A6B8] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Books Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleBooks)
              }%)`,
            }}
          >
            {books.map((book) => (
              <div
                key={book._id}
                className="shrink-0 px-2"
                style={{
                  width: `${100 / visibleBooks}%`,
                }}
              >
                <Link
                  href={`/books/${book._id}`}
                  className="group block"
                >
                  {/* Book Cover */}
                  <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-[#102A3A]">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[280px]"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#063047]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="m-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#063047]">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* Book Information */}
                  <div className="pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#16A6B8]">
                      {book.category}
                    </p>

                    <h3 className="mt-2 line-clamp-1 text-base font-bold text-[#063047] transition-colors group-hover:text-[#16A6B8] dark:text-white sm:text-lg">
                      {book.title}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                      By {book.author}
                    </p>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                      <span className="text-sm font-semibold text-[#063047] dark:text-slate-200">
                        4.8
                      </span>

                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        Featured
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel Controls */}
        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous books"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#063047] transition hover:border-[#16A6B8] hover:bg-[#16A6B8] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next books"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#063047] transition hover:border-[#16A6B8] hover:bg-[#16A6B8] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* See All Books */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-[#063047] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#16A6B8] dark:bg-[#16A6B8] dark:hover:bg-[#20B8C4]"
          >
            Explore All Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}