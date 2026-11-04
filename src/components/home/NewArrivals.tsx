
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { IBook } from "@/types/types";
import BookCard from "../shared/BookCard";

async function getBooks(): Promise<IBook[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}



export default async function NewArrivals() {

  const books = await getBooks();
  return (
    <section className="relative overflow-hidden bg-[#faf9f4] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 top-10 size-64 rounded-full bg-green-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 size-64 rounded-full bg-orange-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            <BookOpen className="size-5" />
            <span>New Arrivals</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#123e2c] sm:text-4xl lg:text-5xl">
            Latest Books in{" "}
            <span className="text-orange-500">
              Our Library
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover the newest additions to our library.
            Fresh stories, new knowledge, and must-read titles,
            all in one place.
          </p>
        </div>

        {/* Static Book Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* See All Books */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600 sm:px-9 sm:text-base"
          >
            <BookOpen className="size-5" />
            See All Books
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
