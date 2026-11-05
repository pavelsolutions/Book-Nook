"use client";

type LoadingSkeletonProps = {
  count?: number;
  variant?: "books" | "stats";
};

export default function LoadingSkeleton({
  count = 6,
  variant = "books",
}: LoadingSkeletonProps) {
  if (variant === "stats") {
    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-[#243746] dark:bg-[#132333]"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#E5F6F8] dark:bg-[#193B49]" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-6 w-16 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors duration-300 dark:border-[#243746] dark:bg-[#132333]"
        >
          {/* Book Cover */}
          <div className="relative h-60 bg-gradient-to-br from-[#E5F6F8] to-slate-100 dark:from-[#193B49] dark:to-[#1B2B3A]">
            <div className="absolute left-4 top-4 h-7 w-20 rounded-full bg-white/80 dark:bg-[#263D4D]" />

            <div className="absolute right-4 top-4 h-7 w-24 rounded-full bg-white/80 dark:bg-[#263D4D]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-2xl bg-[#0B6F83]/10 dark:bg-[#20B8C4]/15" />
            </div>
          </div>

          {/* Book Details */}
          <div className="p-5">
            <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700" />

            <div className="mt-3 h-3 w-1/2 rounded-md bg-slate-100 dark:bg-slate-800" />

            <div className="mt-5 space-y-2">
              <div className="h-3 w-full rounded-md bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-4/5 rounded-md bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Copy Information */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#F4F8FA] p-3.5 dark:bg-[#1B2B3A]">
                <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mt-2 h-5 w-8 rounded bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="rounded-xl bg-[#E5F6F8]/70 p-3.5 dark:bg-[#193B49]/70">
                <div className="h-3 w-16 rounded bg-[#0B6F83]/20 dark:bg-[#20B8C4]/20" />
                <div className="mt-2 h-5 w-8 rounded bg-[#0B6F83]/20 dark:bg-[#20B8C4]/20" />
              </div>
            </div>

            {/* Date */}
            <div className="mt-4 h-3 w-32 rounded-md bg-slate-100 dark:bg-slate-800" />

            {/* Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-[#2A3D4D]">
              <div className="h-10 rounded-xl bg-[#E5F6F8] dark:bg-[#193B49]" />
              <div className="h-10 rounded-xl bg-rose-50 dark:bg-rose-950/30" />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}