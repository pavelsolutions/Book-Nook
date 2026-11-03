import Link from "next/link";
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  LibraryBig,
} from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BookCard from "@/components/shared/BookCard";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
};

// Fetch books from the backend
async function getBooks(): Promise<Book[]> {
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

// Loading skeleton
function BooksLoading() {
  return (
    <section className="min-h-screen bg-[#f8f9fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore <span className="text-indigo-600">Books</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Loading your reading collection...
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl p-0"
            >
              <div className="h-64 bg-slate-200" />

              <CardContent className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-10 rounded bg-slate-100" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main page component
export default function Books() {
  return (
    <Suspense fallback={<BooksLoading />}>
      <BooksList />
    </Suspense>
  );
}

// Async component: fetches and displays books
async function BooksList() {
  const books = await getBooks();
console.log(books, "books");
  return (
    <section className="min-h-screen bg-[#f8f9fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600">
              <LibraryBig size={16} />
              Your reading collection
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore <span className="text-indigo-600">Books</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover your next favorite read from our growing library.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpen size={20} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total books
              </p>

              <p className="text-xl font-bold text-slate-900">
                {books.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter - Static UI */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by book title or author..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div className="relative sm:w-60">
            <SlidersHorizontal
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
              <option>All Categories</option>
              <option>Fiction</option>
              <option>Thriller</option>
              <option>Finance</option>
              <option>Self Development</option>
            </select>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            All Books
          </h2>

          <p className="text-sm text-slate-500">
            Showing {books.length} books
          </p>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book._id} book= {book} />
            ))}
          </div>
        ) : (
          <Card className="rounded-3xl border-dashed bg-white py-16 text-center shadow-none">
            <CardContent>
              <BookOpen
                size={36}
                className="mx-auto text-indigo-500"
              />

              <h3 className="mt-4 text-xl font-bold text-slate-800">
                No books available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Books will appear here when they are added to the library.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}