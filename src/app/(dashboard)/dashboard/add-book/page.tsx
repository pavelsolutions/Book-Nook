"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  ImagePlus,
  Loader2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  ArrowLeft,
  LibraryBig,
  Layers3,
  UserRound,
  Mail,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "sonner";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

type BookFormData = {
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: string;
};

export default function AddBookForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    totalCopies: "1",
  });

  const userName = session?.user?.name ?? "";
  const userEmail = session?.user?.email ?? "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("Please log in before adding a book");
      return;
    }

    if (!formData.image.trim()) {
      toast.error("Please enter a book image URL");
      return;
    }

    const totalCopies = Number(formData.totalCopies);

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    try {
      setLoading(true);

      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category,
        description: formData.description.trim(),
        image: formData.image.trim(),
        totalCopies,
        availableCopies: totalCopies,
        userName,
        email: userEmail,
        addedDate: new Date().toISOString(),
      };

      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        image: "",
        totalCopies: "1",
      });

      router.push("/dashboard/my-books");
      router.refresh();
    } catch (error) {
      console.error("Add book error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#DCE7EC] bg-[#F8FAFC] px-4 py-3.5 text-sm text-[#102A43] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0B6F83] focus:bg-white focus:ring-4 focus:ring-[#0B6F83]/10 dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:text-[#E6F1F5] dark:placeholder:text-[#7893A4] dark:focus:border-[#20B8C4] dark:focus:bg-[#102A3A] dark:focus:ring-[#20B8C4]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#263B50] dark:text-[#D4E2EA]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4F8FA] px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-[#071D2B]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#20B8C4]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#0B6F83]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#718096] transition hover:text-[#0B6F83] dark:text-[#9FB4C2] dark:hover:text-[#20B8C4]"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D5EBEE] bg-[#EAF6F7] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0B6F83] dark:border-[#1E3A4A] dark:bg-[#103746] dark:text-[#20B8C4]">
              <Sparkles size={14} />
              BookNook Library
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl dark:text-[#E6F1F5]">
              Add a New Book
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#718096] sm:text-base dark:text-[#9FB4C2]">
              Share your favorite reads with the community. Add the book
              information below and grow your library.
            </p>
          </div>

          <div className="hidden h-20 w-20 items-center justify-center rounded-3xl border border-[#D5EBEE] bg-white text-[#0B6F83] shadow-sm sm:flex dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:text-[#20B8C4]">
            <LibraryBig size={36} strokeWidth={1.6} />
          </div>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-3xl border border-[#E1EAF0] bg-white shadow-[0_20px_60px_rgba(16,42,67,0.07)] transition-colors duration-300 dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          {/* Card heading */}
          <div className="border-b border-[#E8EEF2] bg-gradient-to-r from-white to-[#F6FBFC] px-6 py-6 sm:px-8 dark:border-[#1E3A4A] dark:from-[#102A3A] dark:to-[#0B2635]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6F7] text-[#0B6F83] dark:bg-[#103746] dark:text-[#20B8C4]">
                <BookOpen size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#102A43] dark:text-[#E6F1F5]">
                  Book Information
                </h2>

                <p className="mt-1 text-sm text-[#718096] dark:text-[#9FB4C2]">
                  Fields marked with{" "}
                  <span className="text-[#0B6F83] dark:text-[#20B8C4]">
                    *
                  </span>{" "}
                  are required.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_300px]">
              {/* Left: Form fields */}
              <div className="space-y-6">
                {/* Book title */}
                <div>
                  <label htmlFor="title" className={labelClass}>
                    Book Title{" "}
                    <span className="text-[#0B6F83] dark:text-[#20B8C4]">
                      *
                    </span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. The Alchemist"
                    className={inputClass}
                  />
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className={labelClass}>
                    Author Name{" "}
                    <span className="text-[#0B6F83] dark:text-[#20B8C4]">
                      *
                    </span>
                  </label>

                  <input
                    id="author"
                    name="author"
                    type="text"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Paulo Coelho"
                    className={inputClass}
                  />
                </div>

                {/* Category and copies */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className={labelClass}>
                      Category{" "}
                      <span className="text-[#0B6F83] dark:text-[#20B8C4]">
                        *
                      </span>
                    </label>

                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
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
                    <label htmlFor="totalCopies" className={labelClass}>
                      Total Copies{" "}
                      <span className="text-[#0B6F83] dark:text-[#20B8C4]">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Layers3
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B6F83] dark:text-[#20B8C4]"
                      />

                      <input
                        id="totalCopies"
                        name="totalCopies"
                        type="number"
                        min={1}
                        step={1}
                        required
                        value={formData.totalCopies}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        className={`${inputClass} pl-11`}
                      />
                    </div>

                    <p className="mt-2 text-xs leading-5 text-[#94A3B8] dark:text-[#7893A4]">
                      Number of physical copies.
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="description" className={labelClass}>
                      Short Description{" "}
                      <span className="text-[#0B6F83] dark:text-[#20B8C4]">
                        *
                      </span>
                    </label>

                    <span className="text-xs font-medium text-[#94A3B8] dark:text-[#7893A4]">
                      {formData.description.length}/500
                    </span>
                  </div>

                  <textarea
                    id="description"
                    name="description"
                    required
                    maxLength={500}
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What makes this book special? Write a short description..."
                    className={`${inputClass} resize-none leading-6`}
                  />
                </div>

                {/* User details */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="userName" className={labelClass}>
                      Added By
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] dark:text-[#7893A4]"
                      />

                      <input
                        id="userName"
                        type="text"
                        value={userName}
                        readOnly
                        className="w-full cursor-not-allowed rounded-xl border border-[#E1EAF0] bg-[#F1F5F8] py-3.5 pl-11 pr-4 text-sm text-[#718096] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#9FB4C2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="userEmail" className={labelClass}>
                      User Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] dark:text-[#7893A4]"
                      />

                      <input
                        id="userEmail"
                        type="email"
                        value={userEmail}
                        readOnly
                        className="w-full cursor-not-allowed rounded-xl border border-[#E1EAF0] bg-[#F1F5F8] py-3.5 pl-11 pr-4 text-sm text-[#718096] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#9FB4C2]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Book cover preview */}
              <aside>
                <div className="rounded-2xl border border-[#E1EAF0] bg-[#F8FAFC] p-4 sm:p-5 dark:border-[#1E3A4A] dark:bg-[#0B2635]">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-[#102A43] dark:text-[#E6F1F5]">
                      Book Cover
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#718096] dark:text-[#9FB4C2]">
                      Add a cover image to make your book stand out.
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-[#E1EAF0] bg-white dark:border-[#1E3A4A] dark:bg-[#102A3A]">
                    {formData.image.trim() ? (
                      <img
                        src={formData.image}
                        alt="Book cover preview"
                        className="h-72 w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-72 w-full flex-col items-center justify-center bg-gradient-to-br from-[#EAF6F7] to-[#F4F8FA] px-5 text-center dark:from-[#103746] dark:to-[#071D2B]">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#0B6F83] shadow-sm dark:bg-[#102A3A] dark:text-[#20B8C4]">
                          <ImagePlus size={30} strokeWidth={1.6} />
                        </div>

                        <span className="text-sm font-semibold text-[#263B50] dark:text-[#D4E2EA]">
                          Cover preview
                        </span>

                        <span className="mt-2 text-xs leading-5 text-[#94A3B8] dark:text-[#7893A4]">
                          Paste an image URL below to preview your book cover.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="image"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#263B50] dark:text-[#D4E2EA]"
                    >
                      <LinkIcon
                        size={15}
                        className="text-[#0B6F83] dark:text-[#20B8C4]"
                      />

                      Image URL{" "}
                      <span className="text-[#0B6F83] dark:text-[#20B8C4]">
                        *
                      </span>
                    </label>

                    <input
                      id="image"
                      name="image"
                      type="url"
                      required
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/book.jpg"
                      className="w-full rounded-xl border border-[#DCE7EC] bg-white px-3.5 py-3 text-sm text-[#102A43] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0B6F83] focus:ring-4 focus:ring-[#0B6F83]/10 dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:text-[#E6F1F5] dark:placeholder:text-[#7893A4] dark:focus:border-[#20B8C4] dark:focus:ring-[#20B8C4]/10"
                    />

                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#EAF6F7] p-3 text-xs leading-5 text-[#52717D] dark:bg-[#103746] dark:text-[#B6C7D2]">
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-[#0B6F83] dark:text-[#20B8C4]"
                      />

                      Upload your image to ImgBB and paste its direct image
                      URL here.
                    </div>
                  </div>
                </div>

                {/* Preview note */}
                <div className="mt-4 rounded-2xl border border-[#D5EBEE] bg-white p-4 dark:border-[#1E3A4A] dark:bg-[#102A3A]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0B6F83] dark:text-[#20B8C4]">
                    <Sparkles size={16} />
                    A little book magic
                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#718096] dark:text-[#9FB4C2]">
                    Every book you add helps another reader discover their
                    next favorite story.
                  </p>
                </div>
              </aside>
            </div>

            {/* Form footer */}
            <div className="flex flex-col-reverse gap-4 border-t border-[#E8EEF2] bg-[#F8FAFC] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-[#1E3A4A] dark:bg-[#0B2635]">
              <p className="text-xs leading-5 text-[#94A3B8] dark:text-[#7893A4]">
                Please check your book information before submitting.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B6F83] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0B6F83]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#07576B] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#43CBD4]"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Adding Book...
                  </>
                ) : (
                  <>
                    <BookOpen size={18} />
                    Add Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-xs text-[#94A3B8] dark:text-[#7893A4]">
          BookNook — Your next favorite book is waiting.
        </p>
      </div>
    </main>
  );
}