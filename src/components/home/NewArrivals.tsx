
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Tag,
  UserRound,
} from "lucide-react";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 6,
    title: "Never Split the Difference",
    author: "Chris Voss",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=85",
  },
];

export default function NewArrivals() {
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
          {books.map((book) => (
            <article
              key={book.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e9e6dd] bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Book Cover */}
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-[#f3f1e8]">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* New Badge */}
                <span className="absolute right-2 top-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                  New
                </span>
              </div>

              {/* Book Details */}
              <div className="flex flex-1 flex-col">
                <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-[#176344]">
                  {book.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <UserRound className="size-4 shrink-0" />
                  <span className="line-clamp-1">
                    {book.author}
                  </span>
                </div>

                {/* Category */}
                <div className="mt-3">
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800">
                    <Tag className="size-3.5 shrink-0" />
                    <span className="truncate">
                      {book.category}
                    </span>
                  </span>
                </div>

                {/* View Details */}
                <Link
                  href="/books"
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-500 px-3 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-500 hover:text-white"
                >
                  View Details
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
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
