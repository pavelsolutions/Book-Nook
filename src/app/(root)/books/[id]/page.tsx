"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  UserRound,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  email?: string;
  userName?: string;
  addedDate?: string;
};

export default function BookDetailsPage() {

  const params = useParams();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const bookId = params.id as string;
  const user = session?.user;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [borrowing, setBorrowing] = useState(false);

  // Fetch book details
  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        setLoading(true);

        const token = await getTokenFromClient();

        // const response = await fetch(`${SERVER_URL}/books/${bookId}`);

        const response = await fetch(`${SERVER_URL}/books/${bookId}`,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load book details");
        }

        const data: Book = await response.json();
        setBook(data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  // Open borrow modal
  const handleOpenBorrowModal = () => {
    if (isPending) return;

    if (!user?.email) {
      toast.error("Please login to borrow this book");
      router.push("/login");
      return;
    }

    setShowBorrowModal(true);
  };

  // Confirm borrowing
  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!book || !user?.email) {
      toast.error("Please login first");
      return;
    }

    if (!returnDate) {
      toast.error("Please select a return date");
      return;
    }

    const borrowDate = new Date().toISOString().split("T")[0];

    if (returnDate <= borrowDate) {
      toast.error("Return date must be after borrow date");
      return;
    }

    const borrowData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image || "",
      userName: user.name || "",
      userEmail: user.email,
      borrowDate,
      returnDate,
    };

    try {
      setBorrowing(true);

      const response = await fetch(`${SERVER_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!");

      setShowBorrowModal(false);
      setReturnDate("");

      router.push("/dashboard/my-borrows");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setBorrowing(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-gray-500">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Not found UI
  if (!book) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <BookOpen size={48} className="mb-4 text-gray-300" />

        <h2 className="text-2xl font-bold text-gray-800">
          Book Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          We could not find the book you are looking for.
        </p>

        <Link
          href="/books"
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Books
        </Link>

        {/* Book Details */}
        <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2">
          {/* Book Image */}
          <div className="flex items-center justify-center rounded-2xl bg-indigo-50 p-6">
            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                width={400}
                height={560}
                unoptimized
                className="max-h-[500px] w-auto rounded-xl object-contain shadow-lg"
              />
            ) : (
              <div className="flex h-[400px] w-full items-center justify-center rounded-xl bg-gray-100">
                <BookOpen size={64} className="text-gray-300" />
              </div>
            )}
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 w-fit rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              {book.category}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {book.title}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-gray-600">
              <UserRound size={18} className="text-indigo-600" />
              <span>
                By <strong>{book.author}</strong>
              </span>
            </div>

            <div className="my-7 h-px w-full bg-gray-100" />

            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              About This Book
            </h2>

            <p className="leading-7 text-gray-600">
              {book.description || "No description available for this book."}
            </p>

            {book.addedDate && (
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={17} />
                Added on {book.addedDate}
              </div>
            )}

            <button
              onClick={handleOpenBorrowModal}
              className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-indigo-700 sm:w-fit"
            >
              Borrow This Book
            </button>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Borrow This Book
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Confirm your borrowing details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowBorrowModal(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Borrow Form */}
            <form onSubmit={handleBorrow} className="space-y-4">
              {/* User Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  User Name
                </label>

                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
                />
              </div>

              {/* User Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
                />
              </div>

              {/* Book Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Book
                </label>

                <input
                  type="text"
                  value={book.title}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Return Date
                </label>

                <input
                  type="date"
                  value={returnDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={borrowing || !user?.email}
                className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {borrowing ? "Confirming..." : "Confirm Borrow"}
              </button>

              <button
                type="button"
                onClick={() => setShowBorrowModal(false)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}