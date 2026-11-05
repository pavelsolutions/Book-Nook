"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Edit3,
  Trash2,
  X,
  Loader2,
  CalendarDays,
  UserRound,
  Search,
  Plus,
  AlertTriangle,
  Library,
  Copy,
  ArrowUpRight,
  CheckCircle2,
  BookMarked,
} from "lucide-react";
import { toast } from "sonner";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  email: string;
  userName?: string;
  description?: string;
  image?: string;
  addedDate?: string;
  totalCopies?: number;
  availableCopies?: number;
};

type EditFormData = {
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: number;
};

const initialFormData: EditFormData = {
  title: "",
  author: "",
  category: "",
  description: "",
  image: "",
  totalCopies: 1,
};

async function readResponse(response: Response) {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#16A6B8] focus:ring-4 focus:ring-[#16A6B8]/10";

export default function MyBooksPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const email = session?.user?.email;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editFormData, setEditFormData] =
    useState<EditFormData>(initialFormData);

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);

  // Fetch books added by the logged-in user
  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchMyBooks = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${SERVER_URL}/my-books/${encodeURIComponent(email)}`,
          { cache: "no-store" }
        );

        const data = await readResponse(response);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch books");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid books response from server");
        }

        setBooks(data);
      } catch (error) {
        console.error("Fetch books error:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Could not load your books"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [email]);

  // Open edit modal
  const handleEditClick = (book: Book) => {
    setSelectedBook(book);

    setEditFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      description: book.description || "",
      image: book.image || "",
      totalCopies: Math.max(1, Number(book.totalCopies ?? 1)),
    });
  };

  // Close edit modal
  const closeEditModal = () => {
    if (editLoading) return;

    setSelectedBook(null);
    setEditFormData(initialFormData);
  };

  // Handle form changes
  const handleEditChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
    }));
  };

  // Update book
  const handleUpdateBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBook) return;

    const title = editFormData.title.trim();
    const author = editFormData.author.trim();
    const totalCopies = Number(editFormData.totalCopies);

    if (!title || !author || !editFormData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    // Keep the current borrowed-copy count unchanged
    const currentAvailable = Number(
      selectedBook.availableCopies ?? selectedBook.totalCopies ?? 1
    );

    const currentTotal = Number(selectedBook.totalCopies ?? 1);
    const borrowedCopies = Math.max(0, currentTotal - currentAvailable);

    if (totalCopies < borrowedCopies) {
      toast.error(
        `Total copies cannot be less than ${borrowedCopies} currently borrowed copies`
      );
      return;
    }

    const availableCopies = totalCopies - borrowedCopies;

    const updatedData = {
      title,
      author,
      category: editFormData.category,
      description: editFormData.description.trim(),
      image: editFormData.image.trim(),
      totalCopies,
      availableCopies,
    };

    try {
      setEditLoading(true);

      const response = await fetch(
        `${SERVER_URL}/books/${selectedBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(result.message || "Failed to update book");
      }

      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id
            ? { ...book, ...updatedData }
            : book
        )
      );

      setSelectedBook(null);
      setEditFormData(initialFormData);

      toast.success("Book updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Update book error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setEditLoading(false);
    }
  };

  // Delete book
  const handleDeleteBook = async () => {
    if (!deleteBook) return;

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `${SERVER_URL}/books/${deleteBook._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete book");
      }

      setBooks((prev) =>
        prev.filter((book) => book._id !== deleteBook._id)
      );

      setDeleteBook(null);

      toast.success("Book deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Delete book error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // Search books
  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title?.toLowerCase().includes(search) ||
      book.author?.toLowerCase().includes(search) ||
      book.category?.toLowerCase().includes(search)
    );
  });

  const availableTotal = books.reduce(
    (total, book) => total + Number(book.availableCopies ?? 0),
    0
  );

  const borrowedTotal = books.reduce((total, book) => {
    const totalCopies = Number(book.totalCopies ?? 1);
    const availableCopies = Number(book.availableCopies ?? totalCopies);

    return total + Math.max(0, totalCopies - availableCopies);
  }, 0);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F7FAFB]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F6F8]">
            <Loader2
              className="animate-spin text-[#16A6B8]"
              size={30}
            />
          </div>

          <p className="text-sm font-medium text-slate-500">
            Loading your library...
          </p>
        </div>
      </div>
    );
  }

  // Login required
  if (!email) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F7FAFB] px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8]">
            <BookOpen size={30} />
          </div>

          <h2 className="mt-5 text-2xl font-bold te-xt-[#063047]">
            Please log in
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            You need to log in to see and manage your books.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 rounded-xl bg-[#063047] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B4962]"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FAFB] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        {/* <section className="relative mb-8 overflow-hidden rounded-[28px] bg-[#063047] px-6 py-8 text-white shadow-xl shadow-[#063047]/10 sm:px-9 sm:py-10">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#16A6B8]/20 blur-3xl" />
          <div className="absolute -bottom-28 right-1/3 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-semibold text-[#B9F2F5]">
                <BookOpen size={14} />
                BookNook Library
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Books
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Keep your personal library organized. Manage your books,
                update details, and track available copies.
              </p>

              <button
                onClick={() => router.push("/add-book")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#16A6B8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#128D9D]"
              >
                <Plus size={18} />
                Add New Book
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-[#B9F2F5] sm:flex">
              <Library size={42} strokeWidth={1.5} />
            </div>
          </div>
        </section> */}

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#16A6B8]">
                <BookOpen size={23} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Titles
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#063047]">
                  {books.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Copy size={23} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Available Copies
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#063047]">
                  {availableTotal}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <BookMarked size={23} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Borrowed Copies
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#063047]">
                  {borrowedTotal}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <UserRound size={23} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  Added By
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-[#063047]">
                  {session?.user?.name || email}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Section Title */}
        <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#063047]">
              Your Library
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {books.length} {books.length === 1 ? "book" : "books"} in your
              collection
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, category..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#16A6B8] focus:ring-4 focus:ring-[#16A6B8]/10"
            />
          </div>
        </section>

        {/* Book List */}
        {filteredBooks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8]">
              <BookOpen size={30} />
            </div>

            <h3 className="text-xl font-bold text-[#063047]">
              {searchTerm ? "No matching books" : "Your library is empty"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {searchTerm
                ? "Try searching with another title, author, or category."
                : "You have not added any books yet. Add your first book to get started."}
            </p>

            {!searchTerm && (
              <button
                onClick={() => router.push("/add-book")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#063047] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B4962]"
              >
                <Plus size={18} />
                Add Your First Book
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book) => {
              const totalCopies = Number(book.totalCopies ?? 1);
              const availableCopies = Number(
                book.availableCopies ?? totalCopies
              );

              return (
                <article
                  key={book._id}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#063047]/[0.07]"
                >
                  {/* Book Cover */}
                  <div className="relative h-60 overflow-hidden bg-gradient-to-br from-[#E5F6F8] to-slate-100">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#16A6B8]/50">
                        <BookOpen size={54} strokeWidth={1.2} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#063047]/25 via-transparent to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#063047] shadow-sm backdrop-blur">
                      {book.category}
                    </span>

                    <span
                      className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                        availableCopies > 0
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {availableCopies > 0 ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <X size={13} />
                      )}
                      {availableCopies > 0 ? "Available" : "Not Available"}
                    </span>
                  </div>

                  {/* Book Details */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold text-[#063047] transition group-hover:text-[#16A6B8]">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      By {book.author}
                    </p>

                    {book.description && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                        {book.description}
                      </p>
                    )}

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-[#F7FAFB] p-3.5">
                        <p className="text-xs font-medium text-slate-500">
                          Total Copies
                        </p>
                        <p className="mt-1 text-lg font-bold text-[#063047]">
                          {totalCopies}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#E5F6F8]/70 p-3.5">
                        <p className="text-xs font-medium text-slate-500">
                          Available
                        </p>
                        <p className="mt-1 text-lg font-bold text-[#16A6B8]">
                          {availableCopies}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <CalendarDays size={14} />
                      {book.addedDate
                        ? new Date(book.addedDate).toLocaleDateString()
                        : "Date not available"}
                    </div>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => handleEditClick(book)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#16A6B8]/20 bg-[#E5F6F8]/70 px-4 py-2.5 text-sm font-semibold text-[#087F8C] transition hover:border-[#16A6B8] hover:bg-[#16A6B8] hover:text-white"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteBook(book)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:border-rose-500 hover:bg-rose-500 hover:text-white"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#063047]/55 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-[#F7FAFB] px-6 py-5 sm:px-8">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#E5F6F8] px-3 py-1 text-xs font-semibold text-[#087F8C]">
                  <Edit3 size={13} />
                  Update Book
                </div>

                <h2 className="text-xl font-bold text-[#063047]">
                  Edit Book Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your book information and copy count.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={editLoading}
                className="rounded-xl p-2.5 text-slate-400 transition hover:bg-white hover:text-[#063047] disabled:opacity-50"
                aria-label="Close edit modal"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdateBook}>
              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Book Title *
                  </label>

                  <input
                    name="title"
                    required
                    value={editFormData.title}
                    onChange={handleEditChange}
                    placeholder="Enter book title"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Author Name *
                  </label>

                  <input
                    name="author"
                    required
                    value={editFormData.author}
                    onChange={handleEditChange}
                    placeholder="Enter author name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category *
                  </label>

                  <select
                    name="category"
                    required
                    value={editFormData.category}
                    onChange={handleEditChange}
                    className={inputClass}
                  >
                    <option value="">Choose category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Total Copies *
                  </label>

                  <input
                    name="totalCopies"
                    type="number"
                    min={1}
                    step={1}
                    required
                    value={editFormData.totalCopies}
                    onChange={handleEditChange}
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Available copies are adjusted based on current borrows.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Book Image URL
                  </label>

                  <input
                    name="image"
                    type="url"
                    value={editFormData.image}
                    onChange={handleEditChange}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Short Description
                  </label>

                  <textarea
                    name="description"
                    rows={4}
                    maxLength={500}
                    value={editFormData.description}
                    onChange={handleEditChange}
                    placeholder="Write a short description..."
                    className={`${inputClass} resize-none`}
                  />

                  <p className="mt-1 text-right text-xs text-slate-400">
                    {editFormData.description.length}/500
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-[#F7FAFB] px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={editLoading}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#063047] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#063047]/10 transition hover:bg-[#0B4962] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editLoading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063047]/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/50 bg-white p-6 shadow-2xl sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <AlertTriangle size={30} />
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-xl font-bold text-[#063047]">
                Delete this book?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#063047]">
                  {deleteBook.title}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteBook(null)}
                disabled={deleteLoading}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteBook}
                disabled={deleteLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Book
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}