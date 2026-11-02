
import {
  Star,
  Quote,
  BookOpen,
} from "lucide-react";

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
    <section className="relative overflow-hidden bg-[#faf9f4] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-orange-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-green-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            <Quote className="size-4" />
            Reader Stories
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#123e2c] sm:text-4xl lg:text-5xl">
            Loved by{" "}
            <span className="text-orange-500">Readers</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            A little love from our reading community.
            See what readers say about their BookNook experience.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group rounded-3xl border border-[#e9e6dd] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              {/* Quote icon */}
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-green-50 text-[#176344]">
                  <Quote className="size-6" />
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
              </div>

              {/* Review text */}
              <p className="mt-6 min-h-28 text-sm leading-7 text-slate-600">
                “{review.review}”
              </p>

              {/* Reader info */}
              <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#e8f1e7] text-sm font-bold text-[#176344]">
                  {review.initials}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#123e2c]">
                    {review.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {review.role}
                  </p>
                </div>

                <BookOpen className="ml-auto size-5 text-orange-400" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
