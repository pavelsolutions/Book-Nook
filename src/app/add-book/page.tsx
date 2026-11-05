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
  BookMarked,
  UserRound,
  Layers,
  FileText,
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

  const inputClass =
    "w-full rounded-xl border border-[#DCE7EC] bg-[#F8FAFC] px-4 py-3.5 text-sm text-[#102A43] outline-none transition-all duration-200 placeholder:text-[#94A3B8] focus:border-[#0B6F83] focus:bg-white focus:ring-4 focus:ring-[#0B6F83]/10";

  const labelClass =
    "mb-2.5 block text-sm font-semibold text-[#263B50]";

  return (
    <div className="min-h-screen bg-[#F4F8FA] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-[#557080] transition hover:text-[#0B6F83]"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {/* Page Header */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B6F83] via-[#087D91] to-[#07576B] px-6 py-8 text-white shadow-lg shadow-[#0B6F83]/15 sm:px-10 sm:py-10">
          <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[30px] border-white/5" />
          <div className="absolute -bottom-20 right-40 h-48 w-48 rounded-full bg-[#20B8C4]/10 blur-2xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/90">
                <Sparkles size={14} />
                BOOKNOOK LIBRARY
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Add a New Book
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Share your favorite reads with the community.
                Add a new book and help others discover their next
                favorite story.
              </p>
            </div>

            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:flex">
              <BookOpen size={38} strokeWidth={1.6} />
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-[#E1EAF0] bg-white shadow-[0_12px_45px_rgba(16,42,67,0.06)]">
          {/* Card Header */}
          <div className="flex items-center gap-4 border-b border-[#E8EEF2] px-6 py-6 sm:px-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F5F7] text-[#0B6F83]">
              <BookMarked size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#102A43]">
                Book Information
              </h2>
              <p className="mt-1 text-sm text-[#718096]">
                Fill in the details to add a book to your library.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_300px]">
              {/* Left: Form Fields */}
              <div className="space-y-6">
                {/* Book Title */}
                <div>
                  <label htmlFor="title" className={labelClass}>
                    Book Title <span className="text-[#E58A45]">*</span>
                  </label>

                  <div className="relative">
                    <BookOpen
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA0AE]"
                    />

                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. The Alchemist"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label htmlFor="author" className={labelClass}>
                    Author Name <span className="text-[#E58A45]">*</span>
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA0AE]"
                    />

                    <input
                      id="author"
                      name="author"
                      type="text"
                      required
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. Paulo Coelho"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Category and Copies */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className={labelClass}>
                      Category <span className="text-[#E58A45]">*</span>
                    </label>

                    <div className="relative">
                      <Layers
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA0AE]"
                      />

                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none pl-11`}
                      >
                        <option value="">Choose category</option>

                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="totalCopies" className={labelClass}>
                      Total Copies <span className="text-[#E58A45]">*</span>
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
                      placeholder="Number of copies"
                      className={inputClass}
                    />
                  </div>
                </div>

                <p className="-mt-3 text-xs text-[#8A9AA8]">
                  Enter the total number of physical copies available in
                  your library.
                </p>

                {/* Description */}
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label htmlFor="description" className={labelClass}>
                      Short Description{" "}
                      <span className="text-[#E58A45]">*</span>
                    </label>

                    <span className="text-xs font-medium text-[#8A9AA8]">
                      {formData.description.length}/500
                    </span>
                  </div>

                  <div className="relative">
                    <FileText
                      size={18}
                      className="absolute left-4 top-4 text-[#8AA0AE]"
                    />

                    <textarea
                      id="description"
                      name="description"
                      required
                      maxLength={500}
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="What makes this book special? Write a short description..."
                      className={`${inputClass} resize-none pl-11 leading-6`}
                    />
                  </div>
                </div>

                {/* User Information */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="userName" className={labelClass}>
                      Added By
                    </label>

                    <input
                      id="userName"
                      type="text"
                      value={userName}
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-[#E1EAF0] bg-[#F1F5F8] px-4 py-3.5 text-sm text-[#718096]"
                    />
                  </div>

                  <div>
                    <label htmlFor="userEmail" className={labelClass}>
                      User Email
                    </label>

                    <input
                      id="userEmail"
                      type="email"
                      value={userEmail}
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-[#E1EAF0] bg-[#F1F5F8] px-4 py-3.5 text-sm text-[#718096]"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Book Image Preview */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="image" className={labelClass}>
                    Book Cover <span className="text-[#E58A45]">*</span>
                  </label>

                  <span className="rounded-full bg-[#E6F5F7] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0B6F83]">
                    Preview
                  </span>
                </div>

                <div className="rounded-2xl border border-[#E1EAF0] bg-[#F7FAFC] p-4">
                  <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border border-[#E7EEF2] bg-white">
                    {formData.image.trim() ? (
                      <img
                        src={formData.image}
                        alt="Book cover preview"
                        className="h-[320px] w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center px-5 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F5F7] text-[#0B6F83]">
                          <ImagePlus size={30} strokeWidth={1.6} />
                        </div>

                        <h3 className="text-sm font-semibold text-[#263B50]">
                          Book cover preview
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#8A9AA8]">
                          Your book image will appear here
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Image URL */}
                  <div className="mt-5">
                    <label
                      htmlFor="image"
                      className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-[#263B50]"
                    >
                      <LinkIcon size={15} className="text-[#0B6F83]" />
                      Image URL
                    </label>

                    <input
                      id="image"
                      name="image"
                      type="url"
                      required
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://your-image-url.jpg"
                      className={inputClass}
                    />
                  </div>

                  <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#EAF6F7] p-3.5 text-xs leading-5 text-[#477681]">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0B6F83]"
                    />

                    <p>
                      Upload your image to ImgBB and paste its direct image
                      URL here.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="flex flex-col-reverse gap-4 border-t border-[#E8EEF2] bg-[#F8FAFC] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-9">
              <p className="text-xs leading-5 text-[#8A9AA8]">
                Please check your book information before submitting.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0B6F83] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0B6F83]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#07576B] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[#8A9AA8]">
          <BookOpen size={14} className="text-[#0B6F83]" />
          Every book you add helps make BookNook a better place for readers.
        </div>
      </div>
    </div>
  );
}