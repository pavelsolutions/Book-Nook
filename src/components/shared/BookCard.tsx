import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { IBook } from "@/types/types";

type BookCardProps = {
  book: IBook;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book._id}`}
      className="group block h-full"
    >
      <Card className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16A6B8]/40 hover:shadow-lg">
        {/* Book Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category Badge */}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#063047] shadow-sm backdrop-blur-sm">
            {book.category}
          </span>
        </div>

        {/* Book Information */}
        <CardContent className="flex flex-col p-4">
          <div className="min-h-[76px]">
            <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#063047] transition-colors duration-300 group-hover:text-[#16A6B8]">
              {book.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              By {book.author}
            </p>
          </div>

          {/* View Details */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 px-1 pt-3">
            <span className="text-sm font-semibold text-[#063047] transition-colors duration-300 group-hover:text-[#16A6B8]">
              View Details
            </span>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5F6F8] text-[#16A6B8] transition-all duration-300 group-hover:bg-[#16A6B8] group-hover:text-white">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}