"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  RotateCcw,
  LibraryBig,
  ArrowLeft,
  AlertTriangle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage?: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
  returnedAt?: string;
};

export default function MyBorrowsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [returnConfirm, setReturnConfirm] = useState<Borrow | null>(null);

  const email = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!email) {
      router.push("/login");
      return;
    }

    const fetchBorrows = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/my-borrows/${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const data: Borrow[] = await response.json();

        const updatedData = data.map((borrow) => ({
          ...borrow,
          status: borrow.status || "borrowed",
        }));

        setBorrows(updatedData);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [email, isPending, router]);

  const handleReturn = async (borrow: Borrow) => {
    if (!email) return;

    if (borrow.status === "returned") {
      toast.error("This book has already been returned");
      return;
    }

    try {
      setReturningId(borrow._id);

      const response = await fetch(`${SERVER_URL}/borrows/${borrow._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to return book");
      }

      setBorrows((previous) =>
        previous.map((item) =>
          item._id === borrow._id
            ? {
                ...item,
                status: "returned",
                returnedAt: new Date().toISOString(),
              }
            : item
        )
      );

      setReturnConfirm(null);
      toast.success("Book returned successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setReturningId(null);
    }
  };

  const borrowedCount = borrows.filter(
    (borrow) => borrow.status === "borrowed"
  ).length;

  const returnedCount = borrows.filter(
    (borrow) => borrow.status === "returned"
  ).length;

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#F7FAFB] px-4 py-10 dark:bg-[#0B2635] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-8 h-8 w-56 rounded-lg bg-gray-200 dark:bg-[#1E3A4A]" />
          <div className="mb-8 h-4 w-80 max-w-full rounded bg-gray-200 dark:bg-[#1E3A4A]" />

          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 rounded-2xl bg-white shadow-sm dark:bg-[#102A3A]"
              />
            ))}
          </div>

          <div className="mt-8 h-72 rounded-2xl bg-white shadow-sm dark:bg-[#102A3A]" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FAFB] px-4 py-8 dark:bg-[#0B2635] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <button
              onClick={() => router.push("/books")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#16A6B8] transition hover:text-[#063047] dark:hover:text-[#20B8C4]"
            >
              <ArrowLeft size={16} />
              Browse Books
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
                <LibraryBig size={25} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#16A6B8] dark:text-[#20B8C4]">
                  Your Library
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#063047] dark:text-[#E6F0F5] sm:text-4xl">
                  My Borrows
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 dark:text-[#9FB4C2] sm:text-base">
              Keep track of your borrowed books, return dates, and reading
              history.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[#D9EEF1] bg-white px-4 py-2 text-sm font-medium text-[#063047] shadow-sm dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:text-[#E6F0F5] sm:self-auto">
            <BookOpen size={17} className="text-[#16A6B8] dark:text-[#20B8C4]" />
            {borrows.length} {borrows.length === 1 ? "Book" : "Books"} Total
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#1E3A4A] dark:bg-[#102A3A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-[#9FB4C2]">
                  Total Borrowed
                </p>

                <p className="mt-2 text-3xl font-bold text-[#063047] dark:text-[#E6F0F5]">
                  {borrows.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
                <BookOpen size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#1E3A4A] dark:bg-[#102A3A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-[#9FB4C2]">
                  Currently Reading
                </p>

                <p className="mt-2 text-3xl font-bold text-[#063047] dark:text-[#E6F0F5]">
                  {borrowedCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                <Clock3 size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#1E3A4A] dark:bg-[#102A3A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-[#9FB4C2]">
                  Successfully Returned
                </p>

                <p className="mt-2 text-3xl font-bold text-[#063047] dark:text-[#E6F0F5]">
                  {returnedCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                <CheckCircle2 size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Borrow List */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-[#1E3A4A] dark:bg-[#102A3A]">
          <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 dark:border-[#1E3A4A] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-[#063047] dark:text-[#E6F0F5]">
                Borrowing History
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#9FB4C2]">
                Your borrowed books and their current status
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E5F6F8] px-3 py-1.5 text-xs font-semibold text-[#087F8C] dark:bg-[#103746] dark:text-[#20B8C4]">
              <span className="h-2 w-2 rounded-full bg-[#16A6B8] dark:bg-[#20B8C4]" />
              {borrowedCount} Active
            </span>
          </div>

          {borrows.length === 0 ? (
            <div className="px-5 py-16 text-center sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
                <BookOpen size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#063047] dark:text-[#E6F0F5]">
                No borrowed books yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-[#9FB4C2]">
                Your borrowed books will appear here. Explore the library and
                find your next favorite book.
              </p>

              <button
                onClick={() => router.push("/books")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#063047] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#08435D] dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#42CBD4]"
              >
                <BookOpen size={17} />
                Explore Books
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-[#F7FAFB] dark:bg-[#0B2635]">
                    <tr>
                      {[
                        "Book",
                        "Borrow Date",
                        "Return Date",
                        "Status",
                        "Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#9FB4C2]"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-[#1E3A4A]">
                    {borrows.map((borrow) => (
                      <tr
                        key={borrow._id}
                        className="transition hover:bg-[#F7FAFB] dark:hover:bg-[#0B2635]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            {borrow.bookImage ? (
                              <Image
                                src={borrow.bookImage}
                                alt={borrow.bookTitle}
                                width={56}
                                height={76}
                                unoptimized
                                className="h-[76px] w-14 rounded-lg object-cover shadow-sm"
                              />
                            ) : (
                              <div className="flex h-[76px] w-14 items-center justify-center rounded-lg bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
                                <BookOpen size={22} />
                              </div>
                            )}

                            <div>
                              <p className="max-w-[240px] font-semibold text-[#063047] dark:text-[#E6F0F5]">
                                {borrow.bookTitle}
                              </p>

                              <p className="mt-1 text-xs text-gray-400 dark:text-[#8FA7B6]">
                                Book ID: {borrow.bookId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#B6C7D2]">
                            <CalendarDays
                              size={15}
                              className="text-[#16A6B8] dark:text-[#20B8C4]"
                            />
                            {borrow.borrowDate}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#B6C7D2]">
                            <CalendarDays
                              size={15}
                              className="text-[#16A6B8] dark:text-[#20B8C4]"
                            />
                            {borrow.returnDate}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge status={borrow.status} />
                        </td>

                        <td className="px-6 py-4">
                          {borrow.status === "borrowed" ? (
                            <button
                              onClick={() => setReturnConfirm(borrow)}
                              disabled={returningId === borrow._id}
                              className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-950/50"
                            >
                              <RotateCcw size={15} />
                              {returningId === borrow._id
                                ? "Returning..."
                                : "Return Book"}
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                              <CheckCircle2 size={16} />
                              Returned
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="grid gap-4 p-4 md:hidden">
                {borrows.map((borrow) => (
                  <article
                    key={borrow._id}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-[#1E3A4A] dark:bg-[#102A3A]"
                  >
                    <div className="flex gap-4">
                      {borrow.bookImage ? (
                        <Image
                          src={borrow.bookImage}
                          alt={borrow.bookTitle}
                          width={72}
                          height={96}
                          unoptimized
                          className="h-24 w-[72px] shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-[72px] shrink-0 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
                          <BookOpen size={25} />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-bold text-[#063047] dark:text-[#E6F0F5]">
                          {borrow.bookTitle}
                        </h3>

                        <div className="mt-2">
                          <StatusBadge status={borrow.status} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 rounded-xl bg-[#F7FAFB] p-3 dark:bg-[#0B2635]">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 text-gray-500 dark:text-[#9FB4C2]">
                          <CalendarDays size={15} />
                          Borrow Date
                        </span>

                        <span className="text-right font-medium text-[#063047] dark:text-[#E6F0F5]">
                          {borrow.borrowDate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 text-gray-500 dark:text-[#9FB4C2]">
                          <CalendarDays size={15} />
                          Return Date
                        </span>

                        <span className="text-right font-medium text-[#063047] dark:text-[#E6F0F5]">
                          {borrow.returnDate}
                        </span>
                      </div>
                    </div>

                    {borrow.status === "borrowed" ? (
                      <button
                        onClick={() => setReturnConfirm(borrow)}
                        disabled={returningId === borrow._id}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-950/50"
                      >
                        <RotateCcw size={16} />
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </button>
                    ) : (
                      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-600 dark:bg-green-950/30 dark:text-green-400">
                        <CheckCircle2 size={16} />
                        Already Returned
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <p className="mt-5 text-center text-xs text-gray-400 dark:text-[#8FA7B6]">
          Happy reading! Keep exploring your library.
        </p>
      </div>

      {/* Return Confirmation Modal */}
      {returnConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#063047]/50 px-4 py-6 backdrop-blur-sm dark:bg-black/70"
          onClick={() => {
            if (!returningId) setReturnConfirm(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="return-modal-title"
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#102A3A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5 dark:border-[#1E3A4A]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-950/30 dark:text-rose-300">
                  <AlertTriangle size={23} />
                </div>

                <div>
                  <h2
                    id="return-modal-title"
                    className="text-xl font-bold text-[#063047] dark:text-[#E6F0F5]"
                  >
                    Return this book?
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-[#9FB4C2]">
                    Please confirm your action
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReturnConfirm(null)}
                disabled={!!returningId}
                aria-label="Close modal"
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 dark:text-[#8FA7B6] dark:hover:bg-[#1E3A4A] dark:hover:text-[#E6F0F5]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm leading-6 text-gray-600 dark:text-[#B6C7D2]">
                Are you sure you want to return this book?
              </p>

              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#D9EEF1] bg-[#F7FAFB] p-4 dark:border-[#1E3A4A] dark:bg-[#0B2635]">
                {returnConfirm.bookImage ? (
                  <Image
                    src={returnConfirm.bookImage}
                    alt={returnConfirm.bookTitle}
                    width={48}
                    height={64}
                    unoptimized
                    className="h-16 w-12 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E5F6F8] text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
                    <BookOpen size={20} />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-[#063047] dark:text-[#E6F0F5]">
                    {returnConfirm.bookTitle}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-[#9FB4C2]">
                    Book ID: {returnConfirm.bookId}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setReturnConfirm(null)}
                  disabled={!!returningId}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#1E3A4A] dark:text-[#B6C7D2] dark:hover:bg-[#1E3A4A]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleReturn(returnConfirm)}
                  disabled={!!returningId}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RotateCcw size={16} />
                  {returningId ? "Returning..." : "Yes, Return Book"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatusBadge({
  status,
}: {
  status: "borrowed" | "returned";
}) {
  const isReturned = status === "returned";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        isReturned
          ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300"
          : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isReturned ? "bg-green-500" : "bg-blue-500"
        }`}
      />

      {isReturned ? "Returned" : "Borrowed"}
    </span>
  );
}