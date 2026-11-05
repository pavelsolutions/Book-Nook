"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  UserRound,
  X,
  LibraryBig,
  CheckCircle2,
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
  totalCopies: number;
  availableCopies: number;
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

        const response = await fetch(`${SERVER_URL}/books/${bookId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load book details");
        }

        const data: Book = await response.json();

        setBook({
          ...data,
          totalCopies: Number(data.totalCopies ?? 0),
          availableCopies: Number(data.availableCopies ?? 0),
        });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
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

    if (!book || book.availableCopies <= 0) {
      toast.error("This book is not available");
      return;
    }

    setShowBorrowModal(true);
  };

  // Confirm borrowing
  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (borrowing) return;

    if (!book || !user?.email) {
      toast.error("Please login first");
      return;
    }

    if (book.availableCopies <= 0) {
      toast.error("This book is not available");
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

      const token = await getTokenFromClient();

      const response = await fetch(`${SERVER_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(borrowData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

      // Update local stock after successful borrowing
      setBook((currentBook) =>
        currentBook
          ? {
              ...currentBook,
              availableCopies: Math.max(
                0,
                currentBook.availableCopies - 1
              ),
            }
          : currentBook
      );

      toast.success("Book borrowed successfully!");

      setShowBorrowModal(false);
      setReturnDate("");

      router.push("/dashboard/my-borrows");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setBorrowing(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F7FAFB] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 size-11 animate-spin rounded-full border-4 border-[#16A6B8] border-t-transparent" />

          <p className="text-sm font-medium text-slate-500">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  // Not found UI
  if (!book) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F7FAFB] px-4 text-center">
        <div className="mb-5 flex size-20 items-center justify-center rounded-3xl bg-[#E5F6F8] text-[#16A6B8]">
          <BookOpen size={42} />
        </div>

        <h2 className="text-2xl font-bold text-[#063047]">
          Book Not Found
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          We could not find the book you are looking for.
        </p>

        <Link
          href="/books"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#063047] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16A6B8]"
        >
          <ArrowLeft size={17} />
          Browse Books
        </Link>
      </div>
    );
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <main className="min-h-screen bg-[#F7FAFB] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Back Button */}
        <Link
          href="/books"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DCEBED] bg-white px-4 py-2.5 text-sm font-medium text-[#063047] shadow-sm transition hover:border-[#16A6B8] hover:text-[#16A6B8]"
        >
          <ArrowLeft size={17} />
          Back to Books
        </Link>

        {/* Book Details */}
        <div className="overflow-hidden rounded-3xl border border-[#DCEBED] bg-white shadow-sm">
          <div className="grid gap-8 p-4 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-10">
            {/* Book Image */}
            <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-[#E5F6F8] p-6 sm:min-h-[480px] sm:p-10">
              {book.image ? (
                <Image
                  src={book.image}
                  alt={book.title}
                  width={400}
                  height={560}
                  unoptimized
                  className="max-h-[500px] w-auto rounded-xl object-contain shadow-xl"
                />
              ) : (
                <div className="flex h-[400px] w-full items-center justify-center rounded-xl bg-white/70">
                  <BookOpen size={64} className="text-[#16A6B8]/40" />
                </div>
              )}
            </div>

            {/* Book Information */}
            <div className="flex flex-col justify-center py-2 sm:py-4">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#16A6B8]/20 bg-[#E5F6F8] px-4 py-2 text-sm font-semibold text-[#063047]">
                <LibraryBig size={16} />
                {book.category}
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#063047] sm:text-4xl lg:text-5xl">
                {book.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 text-slate-600">
                <UserRound size={18} className="text-[#16A6B8]" />

                <span className="text-sm sm:text-base">
                  By <strong className="text-[#063047]">{book.author}</strong>
                </span>
              </div>

              <div className="my-7 h-px w-full bg-[#E7EFF1]" />

              <h2 className="mb-3 text-lg font-bold text-[#063047]">
                About This Book
              </h2>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                {book.description ||
                  "No description available for this book."}
              </p>

              {/* Copy Availability */}
              <div className="mt-7 rounded-2xl border border-[#DCEBED] bg-[#F7FAFB] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Total Copies
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#063047]">
                      {book.totalCopies}
                    </p>
                  </div>

                  <div className="h-10 w-px bg-[#DCEBED]" />

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Available Copies
                    </p>

                    <p
                      className={`mt-1 text-2xl font-bold ${
                        isAvailable ? "text-[#16A6B8]" : "text-red-500"
                      }`}
                    >
                      {book.availableCopies}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      isAvailable
                        ? "bg-[#E5F6F8] text-[#087E8B]"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {isAvailable && <CheckCircle2 size={14} />}

                    {isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>

              {book.addedDate && (
                <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={17} className="text-[#16A6B8]" />
                  Added on {book.addedDate}
                </div>
              )}

              {/* Borrow Button */}
              <button
                onClick={handleOpenBorrowModal}
                disabled={!isAvailable || borrowing}
                className="mt-8 w-full rounded-xl bg-[#063047] px-6 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#16A6B8] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-fit sm:min-w-[220px]"
              >
                {!isAvailable ? "Not Available" : "Borrow This Book"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063047]/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[#DCEBED] bg-white p-5 shadow-2xl sm:p-7">
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#16A6B8]">
                  <BookOpen size={22} />
                </div>

                <h2 className="text-xl font-bold text-[#063047]">
                  Borrow This Book
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Confirm your borrowing details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowBorrowModal(false)}
                disabled={borrowing}
                className="rounded-full p-2 text-slate-500 transition hover:bg-[#E5F6F8] hover:text-[#063047] disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Borrow Form */}
            <form onSubmit={handleBorrow} className="space-y-4">
              {/* User Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#063047]">
                  User Name
                </label>

                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-xl border border-[#DCEBED] bg-[#F7FAFB] px-4 py-3 text-sm text-slate-600 outline-none"
                />
              </div>

              {/* User Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#063047]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-xl border border-[#DCEBED] bg-[#F7FAFB] px-4 py-3 text-sm text-slate-600 outline-none"
                />
              </div>

              {/* Book Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#063047]">
                  Book
                </label>

                <input
                  type="text"
                  value={book.title}
                  readOnly
                  className="w-full rounded-xl border border-[#DCEBED] bg-[#F7FAFB] px-4 py-3 text-sm text-slate-600 outline-none"
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#063047]">
                  Return Date
                </label>

                <input
                  type="date"
                  value={returnDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#DCEBED] bg-white px-4 py-3 text-sm text-[#063047] outline-none transition focus:border-[#16A6B8] focus:ring-4 focus:ring-[#16A6B8]/10"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={borrowing || !user?.email || !isAvailable}
                className="mt-2 w-full rounded-xl bg-[#063047] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#16A6B8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {borrowing ? "Confirming..." : "Confirm Borrow"}
              </button>

              <button
                type="button"
                onClick={() => setShowBorrowModal(false)}
                disabled={borrowing}
                className="w-full rounded-xl border border-[#DCEBED] px-4 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-[#F7FAFB] disabled:cursor-not-allowed disabled:opacity-60"
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