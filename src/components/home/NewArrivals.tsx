import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { IBook } from "@/types/types";
import BookCard from "../shared/BookCard";

async function getBooks(): Promise<IBook[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/new-arrivals`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch new arrivals");
  }

  const result = await response.json();

  const books: IBook[] = Array.isArray(result)
    ? result
    : result.data ?? result.books ?? [];

  return books;
}

export default async function NewArrivals() {
  const books = await getBooks();

  return (
    <section className="relative overflow-hidden bg-white py-14 transition-colors duration-300 dark:bg-[#071D2B] sm:py-16 lg:py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#16A6B8]/5 blur-3xl dark:bg-[#16A6B8]/10" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#063047]/5 blur-3xl dark:bg-[#20B8C4]/10" />

      {/* Content Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#16A6B8]">
            <BookOpen className="h-5 w-5" />
            <span>New Arrivals</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#063047] dark:text-white sm:text-4xl lg:text-5xl">
            Latest Books in{" "}
            <span className="text-[#16A6B8]">Our Library</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Discover the newest additions to our library. Fresh stories,
            new knowledge, and must-read titles, all in one place.
          </p>
        </div>

        {/* Book Cards */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-[#102A3A]">
            <BookOpen className="mx-auto h-10 w-10 text-[#16A6B8]" />

            <p className="mt-3 font-semibold text-[#063047] dark:text-white">
              No books available yet
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              New books will appear here when they are added.
            </p>
          </div>
        )}

        {/* See All Books */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-full bg-[#063047] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#063047]/15 transition-all hover:-translate-y-0.5 hover:bg-[#16A6B8] dark:bg-[#16A6B8] dark:shadow-[#16A6B8]/10 dark:hover:bg-[#20B8C4] sm:px-9 sm:text-base"
          >
            <BookOpen className="h-5 w-5" />
            See All Books
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}