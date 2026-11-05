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

    const confirmed = window.confirm(
      `Are you sure you want to return "${borrow.bookTitle}"?`
    );

    if (!confirmed) return;

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
      <main className="min-h-screen bg-[#F7FAFB] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-8 h-8 w-56 rounded-lg bg-gray-200" />
          <div className="mb-8 h-4 w-80 max-w-full rounded bg-gray-200" />

          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="mt-8 h-72 rounded-2xl bg-white shadow-sm" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FAFB] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <button
              onClick={() => router.push("/books")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#16A6B8] transition hover:text-[#063047]"
            >
              <ArrowLeft size={16} />
              Browse Books
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8]">
                <LibraryBig size={25} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#16A6B8]">
                  Your Library
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#063047] sm:text-4xl">
                  My Borrows
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Keep track of your borrowed books, return dates, and reading
              history.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[#D9EEF1] bg-white px-4 py-2 text-sm font-medium text-[#063047] shadow-sm sm:self-auto">
            <BookOpen size={17} className="text-[#16A6B8]" />
            {borrows.length} {borrows.length === 1 ? "Book" : "Books"} Total
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Borrowed
                </p>
                <p className="mt-2 text-3xl font-bold text-[#063047]">
                  {borrows.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#16A6B8]">
                <BookOpen size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Currently Reading
                </p>
                <p className="mt-2 text-3xl font-bold text-[#063047]">
                  {borrowedCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Clock3 size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Successfully Returned
                </p>
                <p className="mt-2 text-3xl font-bold text-[#063047]">
                  {returnedCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Borrow List */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-[#063047]">
                Borrowing History
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your borrowed books and their current status
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E5F6F8] px-3 py-1.5 text-xs font-semibold text-[#087F8C]">
              <span className="h-2 w-2 rounded-full bg-[#16A6B8]" />
              {borrowedCount} Active
            </span>
          </div>

          {borrows.length === 0 ? (
            <div className="px-5 py-16 text-center sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8]">
                <BookOpen size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#063047]">
                No borrowed books yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Your borrowed books will appear here. Explore the library and
                find your next favorite book.
              </p>

              <button
                onClick={() => router.push("/books")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#063047] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#08435D]"
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
                  <thead className="bg-[#F7FAFB]">
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
                          className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {borrows.map((borrow) => (
                      <tr
                        key={borrow._id}
                        className="transition hover:bg-[#F7FAFB]"
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
                              <div className="flex h-[76px] w-14 items-center justify-center rounded-lg bg-[#E5F6F8] text-[#16A6B8]">
                                <BookOpen size={22} />
                              </div>
                            )}

                            <div>
                              <p className="max-w-[240px] font-semibold text-[#063047]">
                                {borrow.bookTitle}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                Book ID: {borrow.bookId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CalendarDays
                              size={15}
                              className="text-[#16A6B8]"
                            />
                            {borrow.borrowDate}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CalendarDays
                              size={15}
                              className="text-[#16A6B8]"
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
                              onClick={() => handleReturn(borrow)}
                              disabled={returningId === borrow._id}
                              className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <RotateCcw size={15} />
                              {returningId === borrow._id
                                ? "Returning..."
                                : "Return Book"}
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
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
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
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
                        <div className="flex h-24 w-[72px] shrink-0 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#16A6B8]">
                          <BookOpen size={25} />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-bold text-[#063047]">
                          {borrow.bookTitle}
                        </h3>

                        <div className="mt-2">
                          <StatusBadge status={borrow.status} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 rounded-xl bg-[#F7FAFB] p-3">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 text-gray-500">
                          <CalendarDays size={15} />
                          Borrow Date
                        </span>
                        <span className="text-right font-medium text-[#063047]">
                          {borrow.borrowDate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 text-gray-500">
                          <CalendarDays size={15} />
                          Return Date
                        </span>
                        <span className="text-right font-medium text-[#063047]">
                          {borrow.returnDate}
                        </span>
                      </div>
                    </div>

                    {borrow.status === "borrowed" ? (
                      <button
                        onClick={() => handleReturn(borrow)}
                        disabled={returningId === borrow._id}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <RotateCcw size={16} />
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </button>
                    ) : (
                      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-600">
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

        <p className="mt-5 text-center text-xs text-gray-400">
          Happy reading! Keep exploring your library.
        </p>
      </div>
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
          ? "bg-green-50 text-green-700"
          : "bg-blue-50 text-blue-700"
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