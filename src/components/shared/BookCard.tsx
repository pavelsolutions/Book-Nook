import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IBook } from "@/types/types";



const BookCard = ({ book }: { book: IBook }) => {
  return (
    <Link
      href={`/books/${book._id}`}
      className="block h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-slate-200/80 bg-white p-0 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50">
        {/* Book Cover */}
        <div className="relative h-64 overflow-hidden bg-slate-100">
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No book image available
            </div>
          )}

          <div className="absolute left-3 top-3 rounded-full border border-white/50 bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur">
            {book.category}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>

        {/* Book Info */}
        <CardHeader className="px-5 pt-5 pb-0">
          <CardTitle className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-indigo-600">
            {book.title}
          </CardTitle>

          <CardDescription className="line-clamp-1 text-sm text-slate-500">
            by {book.author}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 pt-3">
          {book.description && (
            <p className="line-clamp-2 text-sm leading-5 text-slate-500">
              {book.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="mx-5 mt-auto border-t border-slate-100 px-0 pt-4 pb-5">
          <div className="flex w-full items-center justify-between text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-800">
            View Details

            <span className="flex size-8 items-center justify-center rounded-full bg-indigo-50 transition group-hover:bg-indigo-600 group-hover:text-white">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;