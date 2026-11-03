import { Suspense, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, UserRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
};

async function getBookById(id: string): Promise<Book> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }

  const result = await response.json();

  return result.data;
}

function BookDetails({
  bookPromise,
}: {
  bookPromise: Promise<Book>;
}) {
  const book = use(bookPromise);

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-amber-700"
        >
          <ArrowLeft size={18} />
          Back to Books
        </Link>

        <Card className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <CardContent className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-12 lg:p-12">
            {/* Book Image */}
            <div className="flex items-center justify-center rounded-2xl bg-[#f2eee7] p-6 sm:p-10">
              <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 320px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Book Information */}
            <div className="flex flex-col justify-center py-2">
              <span className="mb-5 w-fit rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800">
                {book.category}
              </span>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {book.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 text-gray-600">
                <UserRound size={18} className="text-amber-700" />

                <span className="text-base">
                  By{" "}
                  <span className="font-semibold text-gray-800">
                    {book.author}
                  </span>
                </span>
              </div>

              <div className="my-8 h-px w-full bg-gray-200" />

              {/* Description */}
              <div>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <BookOpen size={20} className="text-amber-700" />
                  About This Book
                </h2>

                <p className="text-sm leading-7 text-gray-600 sm:text-base">
                  {book.description ||
                    "No description is available for this book yet."}
                </p>
              </div>

              {/* Category */}
              <div className="mt-8 rounded-2xl bg-[#faf8f4] p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Book Category
                </p>

                <p className="mt-2 font-semibold text-gray-800">
                  {book.category}
                </p>
              </div>

              {/* Explore More */}
              <Link
                href="/books"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-amber-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800 sm:w-fit"
              >
                Explore More Books
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bookPromise = getBookById(id);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
          <p className="text-lg font-medium text-gray-500">
            Loading book details...
          </p>
        </div>
      }
    >
      <BookDetails bookPromise={bookPromise} />
    </Suspense>
  );
}