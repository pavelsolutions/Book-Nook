"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  LibraryBig,
  X,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import BookCard from "@/components/shared/BookCard";
import { IBook } from "@/types/types";

type BooksClientProps = {
  books: IBook[];
};

export default function BooksClient({ books }: BooksClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  // Get unique categories from API data
  const categories = useMemo(() => {
    return [
      ...new Set(
        books
          .map((book) => book.category?.trim())
          .filter((category): category is string => Boolean(category))
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [books]);

  // Search and category filtering
  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(normalizedSearch) ||
        book.author.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        book.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" || selectedCategory !== "All Categories";

  return (
    <section className="min-h-screen bg-[#F7FAFB] py-8 text-[#102A43] transition-colors duration-300 sm:py-10 dark:bg-[#071D2B] dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#16A6B8]/20 bg-[#E5F6F8] px-4 py-2 text-sm font-medium text-[#063047] dark:border-[#20B8C4]/20 dark:bg-[#103746] dark:text-[#20B8C4]">
              <LibraryBig size={16} />
              Your reading collection
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#063047] sm:text-4xl lg:text-5xl dark:text-white">
              Explore <span className="text-[#16A6B8] dark:text-[#20B8C4]">Books</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base dark:text-[#B6C7D2]">
              Discover your next favorite read from our growing library of
              stories, knowledge, and imagination.
            </p>
          </div>

          {/* Total Books */}
          <div className="flex w-full items-center gap-4 rounded-2xl border border-[#DCEBED] bg-white p-4 shadow-sm transition-colors duration-300 md:w-auto md:min-w-[210px] dark:border-[#1E3A4A] dark:bg-[#102A3A]">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
              <BookOpen size={23} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-[#B6C7D2]">
                Total books
              </p>

              <p className="mt-1 text-2xl font-bold text-[#063047] dark:text-white">
                {books.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Category Filter */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#DCEBED] bg-white p-4 shadow-sm transition-colors duration-300 sm:flex-row dark:border-[#1E3A4A] dark:bg-[#102A3A]">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#16A6B8] dark:text-[#20B8C4]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by book title or author..."
              aria-label="Search books by title or author"
              className="h-12 w-full rounded-xl border border-[#DCEBED] bg-[#F7FAFB] pl-11 pr-11 text-sm text-[#063047] outline-none transition placeholder:text-slate-400 focus:border-[#16A6B8] focus:bg-white focus:ring-4 focus:ring-[#16A6B8]/10 dark:border-[#294454] dark:bg-[#071D2B] dark:text-white dark:placeholder:text-[#78909C] dark:focus:border-[#20B8C4] dark:focus:bg-[#071D2B] dark:focus:ring-[#20B8C4]/10"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#E5F6F8] hover:text-[#063047] dark:text-[#78909C] dark:hover:bg-[#103746] dark:hover:text-white"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Category */}
          <div className="relative sm:w-60">
            <SlidersHorizontal
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#16A6B8] dark:text-[#20B8C4]"
            />

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              aria-label="Filter books by category"
              className="h-12 w-full appearance-none rounded-xl border border-[#DCEBED] bg-[#F7FAFB] pl-11 pr-4 text-sm font-medium text-[#063047] outline-none transition focus:border-[#16A6B8] focus:ring-4 focus:ring-[#16A6B8]/10 dark:border-[#294454] dark:bg-[#071D2B] dark:text-white dark:focus:border-[#20B8C4] dark:focus:ring-[#20B8C4]/10"
            >
              <option value="All Categories">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#063047] sm:text-2xl dark:text-white">
              {hasActiveFilters ? "Search Results" : "All Books"}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-[#B6C7D2]">
              {filteredBooks.length} of {books.length} books found
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-full border border-[#16A6B8]/20 bg-[#E5F6F8] px-4 py-2 text-sm font-semibold text-[#063047] transition hover:bg-[#16A6B8] hover:text-white dark:border-[#20B8C4]/20 dark:bg-[#103746] dark:text-[#20B8C4] dark:hover:bg-[#20B8C4] dark:hover:text-[#071D2B]"
            >
              <X size={15} />
              Clear filters
            </button>
          )}
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <Card className="rounded-3xl border border-dashed border-[#B8DDE2] bg-white py-16 text-center shadow-none transition-colors duration-300 dark:border-[#294454] dark:bg-[#102A3A]">
            <CardContent>
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
                <BookOpen size={32} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#063047] dark:text-white">
                No books found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-[#B6C7D2]">
                We couldn&apos;t find any books matching your search or selected
                category. Try another keyword or clear your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-[#063047] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16A6B8] dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#16A6B8]"
              >
                Show all books
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}