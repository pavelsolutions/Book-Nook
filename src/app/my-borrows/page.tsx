"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

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

        // Support older borrow records that do not have a status field.
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

      const response = await fetch(
        `${SERVER_URL}/borrows/${borrow._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to return book");
      }

      // Keep the record in the list and update its status.
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

  if (isPending || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-500">
          Loading your borrowed books...
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Your Library
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          My Borrows
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage the books you have borrowed.
        </p>
      </div>

      {/* Empty state */}
      {borrows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No borrowed books
          </h2>

          <p className="mt-2 text-gray-500">
            Books you borrow will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Image
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Title
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Borrow Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Return Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {borrows.map((borrow) => (
                <tr key={borrow._id} className="hover:bg-gray-50">
                  {/* Book image */}
                  <td className="px-6 py-4">
                    {borrow.bookImage ? (
                      <Image
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        width={56}
                        height={72}
                        unoptimized
                        className="h-[72px] w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-[72px] w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </td>

                  {/* Book title */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {borrow.bookTitle}
                  </td>

                  {/* Borrow date */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {borrow.borrowDate}
                  </td>

                  {/* Return date */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {borrow.returnDate}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        borrow.status === "returned"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {borrow.status === "returned"
                        ? "Returned"
                        : "Borrowed"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    {borrow.status === "borrowed" ? (
                      <button
                        onClick={() => handleReturn(borrow)}
                        disabled={returningId === borrow._id}
                        className="rounded-lg bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">
                        Already returned
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}