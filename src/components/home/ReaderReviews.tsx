import { Star, Quote, BookOpen } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Avid Reader",
    initials: "SA",
    rating: 5,
    review:
      "BookNook has made reading so much easier for me. I can discover amazing books and enjoy new stories without any hassle.",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    role: "Book Lover",
    initials: "TH",
    rating: 5,
    review:
      "I love how simple the library experience is. The collection is wonderful, and finding my next favorite book is effortless.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Regular Reader",
    initials: "NJ",
    rating: 5,
    review:
      "A lovely place for anyone who enjoys reading. BookNook encourages me to read more and explore different genres.",
  },
];

export default function ReaderReviews() {
  return (
    <section className="relative overflow-hidden bg-[#F7FAFB] py-16 transition-colors duration-300 dark:bg-[#071D2B] lg:py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#16A6B8]/5 blur-3xl dark:bg-[#16A6B8]/10" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#063047]/5 blur-3xl dark:bg-[#20B8C4]/10" />

      {/* Content Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F6F8] px-4 py-2 text-sm font-semibold text-[#16A6B8] dark:bg-[#103746] dark:text-[#20B8C4]">
            <Quote className="h-4 w-4" />
            Reader Stories
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#063047] dark:text-white sm:text-4xl lg:text-5xl">
            Loved by{" "}
            <span className="text-[#16A6B8]">Readers</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            A little love from our reading community. See what readers
            say about their BookNook experience.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16A6B8]/30 hover:shadow-xl dark:border-slate-700 dark:bg-[#102A3A] dark:hover:border-[#16A6B8]/50 sm:p-8"
            >
              {/* Quote Icon and Rating */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#16A6B8] transition-colors duration-300 group-hover:bg-[#16A6B8] group-hover:text-white dark:bg-[#103746] dark:text-[#20B8C4] dark:group-hover:bg-[#16A6B8] dark:group-hover:text-white">
                  <Quote className="h-6 w-6" />
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="mt-6 min-h-28 text-sm leading-7 text-slate-600 dark:text-slate-300">
                “{review.review}”
              </p>

              {/* Reader Information */}
              <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F6F8] text-sm font-bold text-[#063047] transition-colors duration-300 group-hover:bg-[#16A6B8] group-hover:text-white dark:bg-[#103746] dark:text-[#20B8C4] dark:group-hover:bg-[#16A6B8] dark:group-hover:text-white">
                  {review.initials}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#063047] dark:text-white">
                    {review.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {review.role}
                  </p>
                </div>

                <BookOpen className="ml-auto h-5 w-5 text-[#16A6B8] dark:text-[#20B8C4]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}