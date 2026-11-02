
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    eyebrow: "Online Library",
    title: "Discover Your Next",
    highlight: "Favorite Book",
    description:
      "Explore a world of stories, knowledge, and imagination. Find the perfect book for your next reading adventure.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    eyebrow: "Explore New Stories",
    title: "Every Page Opens",
    highlight: "A New World",
    description:
      "From timeless classics to exciting new stories, discover books that inspire, educate, and entertain.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    eyebrow: "Your Reading Journey",
    title: "Read More. Learn",
    highlight: "Grow More.",
    description:
      "Build your reading habit with BookNook. Borrow your favorite books and make every page count.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Banner() {
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent Swiper from rendering during prerender
  if (!isMounted) {
    return (
      <section className="bg-[#f8f7ef] px-3 py-5 sm:px-6 sm:py-8 lg:px-10">
        <div className="mx-auto h-[540px] max-w-[1600px] animate-pulse rounded-[28px] bg-[#f7f6ec] sm:rounded-[36px] lg:h-[600px]" />
      </section>
    );
  }

  return (
    <section className="bg-[#f8f7ef] px-3 py-5 sm:px-6 sm:py-8 lg:px-10">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[28px] bg-[#f7f6ec] shadow-xl sm:rounded-[36px]">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          speed={700}
          className="booknook-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative grid min-h-[540px] grid-cols-1 overflow-hidden lg:min-h-[600px] lg:grid-cols-2">
                {/* Left content */}
                <div className="relative z-10 flex items-center px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
                  <div className="max-w-2xl">
                    {/* Brand */}
                    <Link
                      href="/"
                      className="mb-8 inline-flex items-center gap-3"
                    >
                      <BookOpen className="size-9 text-orange-500" />

                      <span className="text-2xl font-bold tracking-tight text-[#123e2c]">
                        BookNook
                      </span>

                      <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-600 sm:text-sm">
                        {slide.eyebrow}
                      </span>
                    </Link>

                    {/* Heading */}
                    <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[#123e2c] sm:text-5xl lg:text-6xl">
                      {slide.title}

                      <span className="mt-1 block text-orange-500">
                        {slide.highlight}
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-base leading-7 text-[#24372f] sm:text-lg sm:leading-8">
                      {slide.description}
                    </p>

                    {/* CTA */}
                    <Link
                      href="/books"
                      className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-orange-500 px-7 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:h-14 sm:px-9 sm:text-base"
                    >
                      Browse Books
                      <ArrowRight className="size-5" />
                    </Link>
                  </div>
                </div>

                {/* Right image */}
                <div className="relative min-h-[300px] lg:min-h-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${slide.image}")`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#f7f6ec] via-[#f7f6ec]/20 to-transparent lg:bg-gradient-to-r lg:from-[#f7f6ec]/10 lg:via-transparent lg:to-transparent" />

                  <div className="absolute inset-0 bg-[#123e2c]/10" />

                  {/* Decorative circle */}
                  <div className="absolute -left-20 -top-24 size-72 rounded-full bg-[#c7dfbd]/40 blur-sm" />
                </div>

                {/* Decorative bottom wave */}
                <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full">
                  <svg
                    viewBox="0 0 1440 150"
                    className="h-20 w-full sm:h-28"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,80 C180,160 300,130 500,80 C700,20 850,30 1050,100 C1200,150 1320,130 1440,70 L1440,150 L0,150 Z"
                      fill="#4f865d"
                      opacity="0.85"
                    />

                    <path
                      d="M0,110 C200,160 380,140 580,100 C800,50 920,70 1100,120 C1250,150 1350,140 1440,100 L1440,150 L0,150 Z"
                      fill="#236342"
                    />
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Previous button */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#123e2c] shadow-lg transition hover:bg-orange-500 hover:text-white md:flex"
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#123e2c] shadow-lg transition hover:bg-orange-500 hover:text-white md:flex"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {/* Pagination styling */}
      <style jsx global>{`
        .booknook-swiper .swiper-pagination {
          bottom: 22px !important;
        }

        .booknook-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #ffffff;
          border: 1px solid #4f865d;
          opacity: 0.8;
        }

        .booknook-swiper .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 999px;
          background: #f97316;
          border: 1px solid #f97316;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
