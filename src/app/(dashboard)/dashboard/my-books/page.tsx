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
} from "lucide-react";
import toast from "react-hot-toast";

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

    // Keep the current borrowed-copy count unchanged.
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

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title?.toLowerCase().includes(search) ||
      book.author?.toLowerCase().includes(search) ||
      book.category?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            className="animate-spin text-green-600"
            size={32}
          />
          <p className="text-sm text-slate-500">
            Loading your books...
          </p>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <BookOpen
            className="mx-auto mb-4 text-slate-300"
            size={48}
          />
          <h2 className="text-xl font-bold text-slate-800">
            Please log in
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            You need to log in to see your books.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9f6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
              <BookOpen size={14} />
              BookNook Library
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Books
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage the books you have added to your library.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
            <Library size={28} />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <BookOpen size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Books</p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {books.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <UserRound size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Added By</p>
                <p className="truncate text-sm font-semibold text-slate-900">
                  {email}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Copy size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Available Copies
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {books.reduce(
                    (total, book) =>
                      total + Number(book.availableCopies ?? 0),
                    0
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your Library
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {books.length} {books.length === 1 ? "book" : "books"} added
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
            />
          </div>
        </div>

        {/* Book List */}
        {filteredBooks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <BookOpen size={30} />
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              {searchTerm
                ? "No matching books"
                : "Your library is empty"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              {searchTerm
                ? "Try searching with another title, author, or category."
                : "You have not added any books yet. Add your first book to get started."}
            </p>

            {!searchTerm && (
              <button
                onClick={() => router.push("/add-book")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
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
                <div
                  key={book._id}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Book Image */}
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-300">
                        <BookOpen size={48} />
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm backdrop-blur">
                      {book.category}
                    </span>

                    <span
                      className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                        availableCopies > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {availableCopies > 0
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>

                  {/* Book Details */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
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
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Total Copies
                        </p>
                        <p className="mt-1 font-bold text-slate-900">
                          {totalCopies}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Available Copies
                        </p>
                        <p className="mt-1 font-bold text-slate-900">
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

                    {/* Edit and Delete Buttons */}
                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => handleEditClick(book)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteBook(book)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Book
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update your book information and copy count.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={editLoading}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                aria-label="Close edit modal"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdateBook}>
              <div className="grid gap-5 p-6 sm:grid-cols-2">
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
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
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
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
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
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Available copies are adjusted based on current borrows.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Book Image URL
                  </label>
                  <input
                    name="image"
                    type="url"
                    value={editFormData.image}
                    onChange={handleEditChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
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
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />
                  <p className="mt-1 text-right text-xs text-slate-400">
                    {editFormData.description.length}/500
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={editLoading}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editLoading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <AlertTriangle size={28} />
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Delete this book?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-800">
                  {deleteBook.title}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}