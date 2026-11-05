import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Repeat2,
  Layers3,
  UsersRound,
  CheckCircle2,
  Star,
  Heart,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Discover Books",
    description: "Find and explore books from our growing collection.",
  },
  {
    icon: Repeat2,
    title: "Borrow & Return",
    description: "Borrow books easily and return them on time.",
  },
  {
    icon: Layers3,
    title: "Manage Collection",
    description: "Add, update, and keep track of your books.",
  },
  {
    icon: UsersRound,
    title: "Build a Reading Community",
    description: "Share knowledge and inspire others to read.",
  },
];

const missionPoints = [
  "Promote a reading culture.",
  "Provide an easy and user-friendly library system.",
  "Help users manage and share books efficiently.",
  "Make knowledge more accessible to everyone.",
];

const stats = [
  { icon: UsersRound, value: "1,200+", label: "Registered Users" },
  { icon: BookOpen, value: "3,500+", label: "Books in Collection" },
  { icon: Repeat2, value: "2,800+", label: "Books Borrowed" },
  { icon: Star, value: "4.8", label: "User Rating" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F4F8FA]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7FBFC] to-[#E5F6F8]">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#20B8C4]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-[#0B6F83]/5 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#20B8C4]/20 bg-[#E5F6F8] px-4 py-2 text-sm font-semibold text-[#0B6F83]">
              <Sparkles size={15} />
              About BookNook
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-[#102A43] sm:text-5xl lg:text-6xl">
              A Modern Library for
              <span className="mt-1 block text-[#0B6F83]">
                Book Lovers
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              BookNook is a simple and modern library management platform
              where you can discover, borrow, and manage books with ease.
              Our goal is to make reading more accessible, organized, and
              enjoyable for everyone.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/books"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#0B6F83] px-7 text-sm font-bold text-white shadow-lg shadow-[#0B6F83]/20 transition hover:-translate-y-1 hover:bg-[#102A43] sm:text-base"
              >
                Explore Books
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/add-book"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#0B6F83]/20 bg-white/80 px-7 text-sm font-semibold text-[#102A43] transition hover:border-[#0B6F83] hover:bg-[#E5F6F8] sm:text-base"
              >
                Add a Book
                <BookOpen size={17} />
              </Link>
            </div>
          </div>

          {/* Book illustration */}
          <div className="relative mx-auto flex h-[300px] w-full max-w-[520px] items-center justify-center sm:h-[380px]">
            <div className="absolute size-64 rounded-full bg-[#20B8C4]/10 blur-2xl sm:size-80" />

            <div className="relative flex items-end justify-center gap-3">
              <div className="relative h-52 w-24 -rotate-6 rounded-r-xl bg-[#0B6F83] shadow-xl sm:h-64 sm:w-32">
                <div className="absolute left-0 top-0 h-full w-3 rounded-l-md bg-[#064B5B]" />
                <div className="absolute inset-x-4 top-8 border-y border-white/30 py-5 text-center text-xs font-bold tracking-widest text-white">
                  BOOK
                </div>
                <div className="absolute bottom-5 left-4 right-4 text-center text-[10px] font-semibold text-white/70">
                  BOOKNOOK
                </div>
              </div>

              <div className="relative h-60 w-28 rotate-2 rounded-r-xl bg-[#20B8C4] shadow-xl sm:h-72 sm:w-36">
                <div className="absolute left-0 top-0 h-full w-3 rounded-l-md bg-[#0B6F83]" />
                <div className="absolute inset-x-4 top-8 border-y border-white/30 py-5 text-center text-xs font-bold tracking-widest text-white">
                  READ
                </div>
                <div className="absolute bottom-5 left-4 right-4 text-center text-[10px] font-semibold text-white/70">
                  DISCOVER
                </div>
              </div>

              <div className="relative h-48 w-24 rotate-6 rounded-r-xl bg-[#102A43] shadow-xl sm:h-60 sm:w-32">
                <div className="absolute left-0 top-0 h-full w-3 rounded-l-md bg-[#071B2C]" />
                <div className="absolute inset-x-4 top-8 border-y border-white/30 py-5 text-center text-xs font-bold tracking-widest text-white">
                  LEARN
                </div>
                <div className="absolute bottom-5 left-4 right-4 text-center text-[10px] font-semibold text-white/70">
                  GROW
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 right-2 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-8 sm:right-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#E5F6F8] text-[#0B6F83]">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Welcome to</p>
                <p className="text-sm font-bold text-[#102A43]">
                  Your Library
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group text-center"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#E5F6F8] text-[#0B6F83] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#0B6F83] group-hover:text-white">
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                <h2 className="mt-4 text-lg font-bold text-[#102A43]">
                  {feature.title}
                </h2>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#F4F8FA] py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Image-style panel */}
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B6F83] to-[#102A43] p-8 shadow-xl shadow-[#102A43]/10 sm:min-h-[420px]">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-[#20B8C4]/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 size-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              <div className="flex size-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-[#B9F2F5] shadow-2xl backdrop-blur">
                <BookOpen size={54} strokeWidth={1.4} />
              </div>

              <p className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Read. Discover.
                <span className="block text-[#B9F2F5]">Grow.</span>
              </p>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                Every book opens a door to a new idea, a new experience,
                and a new possibility.
              </p>

              <div className="mt-7 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                <Heart size={15} className="text-[#20B8C4]" />
                Made for book lovers
              </div>
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-[#E5F6F8] px-4 py-2 text-sm font-semibold text-[#0B6F83]">
              Our Mission
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl">
              Why We Built BookNook
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              We believe reading has the power to educate, inspire, and
              create positive change. BookNook brings technology and
              reading together, making it easier for individuals, students,
              and communities to access and share books.
            </p>

            <div className="mt-7 space-y-4">
              {missionPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-[#20B8C4]"
                  />
                  <p className="text-sm leading-6 text-slate-700 sm:text-base">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 rounded-[28px] bg-gradient-to-br from-[#F4F8FA] to-[#E5F6F8] p-6 sm:gap-6 sm:p-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <Icon
                  size={32}
                  className="text-[#0B6F83]"
                  strokeWidth={1.8}
                />

                <p className="mt-3 text-2xl font-extrabold text-[#102A43] sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F4F8FA] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#102A43] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#B9F2F5]">
            <BookOpen size={28} />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your Next Favorite Book Awaits
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            Explore our collection, discover a new story, and make reading
            a part of your everyday life with BookNook.
          </p>

          <Link
            href="/books"
            className="group mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-[#20B8C4] px-7 text-sm font-bold text-[#102A43] transition hover:-translate-y-1 hover:bg-[#B9F2F5] sm:text-base"
          >
            Start Exploring
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}