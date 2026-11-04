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
} from "lucide-react";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
              <Sparkles size={14} />
              BookNook Library
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Add a New Book
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Share your favorite reads with the community. Add the details
              below to grow your library.
            </p>
          </div>

          <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 sm:flex">
            <BookOpen size={32} />
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          {/* Card Header */}
          <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Book Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fields marked with * are required.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
              {/* Left: Form Fields */}
              <div className="space-y-6">
                {/* Book Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Book Title <span className="text-orange-500">*</span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. The Alchemist"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                {/* Author Name */}
                <div>
                  <label
                    htmlFor="author"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Author Name <span className="text-orange-500">*</span>
                  </label>

                  <input
                    id="author"
                    name="author"
                    type="text"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Paulo Coelho"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Category <span className="text-orange-500">*</span>
                  </label>

                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="">Choose a category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Copies - ADDED */}
                <div>
                  <label
                    htmlFor="totalCopies"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Total Copies <span className="text-orange-500">*</span>
                  </label>

                  <input
                    id="totalCopies"
                    name="totalCopies"
                    type="number"
                    min={1}
                    step={1}
                    required
                    value={formData.totalCopies}
                    onChange={handleChange}
                    placeholder="Enter total number of copies"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Enter the total number of physical copies in your library.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="description"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Short Description{" "}
                      <span className="text-orange-500">*</span>
                    </label>

                    <span className="text-xs text-gray-400">
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
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                {/* User Name */}
                <div>
                  <label
                    htmlFor="userName"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    User Name
                  </label>

                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3.5 text-sm text-gray-500"
                  />
                </div>

                {/* User Email */}
                <div>
                  <label
                    htmlFor="userEmail"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    User Email
                  </label>

                  <input
                    id="userEmail"
                    type="email"
                    value={userEmail}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3.5 text-sm text-gray-500"
                  />
                </div>
              </div>

              {/* Right: Image URL and Preview */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Book Image URL <span className="text-orange-500">*</span>
                </label>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="relative">
                    {formData.image.trim() ? (
                      <img
                        src={formData.image}
                        alt="Book cover preview"
                        className="h-72 w-full rounded-xl bg-white object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-72 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white px-4 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                          <ImagePlus size={28} />
                        </div>

                        <span className="text-sm font-semibold text-gray-800">
                          Book cover preview
                        </span>

                        <span className="mt-2 text-xs text-gray-400">
                          Paste an image URL below
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="image"
                      className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-600"
                    >
                      <LinkIcon size={14} />
                      Image URL
                    </label>

                    <input
                      id="image"
                      name="image"
                      type="url"
                      required
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://i.ibb.co/your-image.jpg"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>

                  <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-400">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                    Upload your image to ImgBB and paste its direct image URL
                    here.
                  </div>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-xs leading-5 text-gray-400">
                Please check your book information before submitting.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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

        {/* Bottom Note */}
        <p className="mt-5 text-center text-xs text-gray-400">
          Every book you add helps make BookNook a better place for readers.
        </p>
      </div>
    </div>
  );
}