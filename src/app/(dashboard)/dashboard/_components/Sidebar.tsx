"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BookPlus,
  BookMarked,
  ChevronRight,
  Sparkles,
  Home,
  User,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  {
    title: "Back to Home",
    href: "/",
    icon: Home,
  },
  {
    title: "My Books",
    href: "/dashboard/my-books",
    icon: BookOpen,
  },
  {
    title: "My Borrow",
    href: "/dashboard/my-borrows",
    icon: BookMarked,
  },
  {
    title: "Add Book",
    href: "/dashboard/add-book",
    icon: BookPlus,
  },
  {
    title: "My Profile",
    href: "/dashboard/my-profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-[#E8EEF2] px-6 dark:border-[#1E3A4A]">
        <Link
          href="/dashboard"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B6F83] to-[#20B8C4] text-white shadow-lg shadow-[#0B6F83]/20">
            <BookOpen size={24} strokeWidth={2} />

            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#F5B942] dark:border-[#071D2B]">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#102A43] dark:text-[#E6F1F5]">
              Book<span className="text-[#0B6F83] dark:text-[#20B8C4]">Nook</span>
            </h1>

            <p className="mt-0.5 text-[10px] font-medium tracking-wide text-[#718096] dark:text-[#9FB4C2]">
              Your cozy corner for books
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
        <div className="mb-5 flex items-center justify-between px-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#94A3B8] dark:text-[#7893A4]">
            Main Menu
          </p>

          <Sparkles size={14} className="text-[#20B8C4]" />
        </div>

        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#EAF6F7] text-[#0B6F83] dark:bg-[#103746] dark:text-[#20B8C4]"
                  : "text-[#607486] hover:bg-[#F4F9FA] hover:text-[#0B6F83] dark:text-[#B6C7D2] dark:hover:bg-[#102A3A] dark:hover:text-[#20B8C4]"
              }`}
            >
              {isActive && (
                <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#0B6F83] dark:bg-[#20B8C4]" />
              )}

              <Icon
                size={19}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-[#0B6F83] dark:text-[#20B8C4]"
                    : "text-[#8AA0AE] group-hover:text-[#0B6F83] dark:text-[#7893A4] dark:group-hover:text-[#20B8C4]"
                }`}
              />

              <span className="flex-1">{item.title}</span>

              {isActive && (
                <ChevronRight size={16} className="text-[#20B8C4]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Library Promo */}
      <div className="shrink-0 px-4 pb-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B6F83] to-[#087D91] p-4 text-white dark:from-[#103746] dark:to-[#0B5263]">
          <div className="relative z-10">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <BookOpen size={19} />
            </div>

            <h3 className="text-sm font-semibold">Keep Reading!</h3>

            <p className="mt-1 text-xs leading-5 text-white/75">
              Every book opens a new world of knowledge.
            </p>

            <Link
              href="/books"
              onClick={closeMobileMenu}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white transition hover:text-[#B8F3F5]"
            >
              Explore books
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full border-[14px] border-white/5" />
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-[#E8EEF2] px-4 py-5 dark:border-[#1E3A4A]">
        <p className="text-center text-xs font-medium text-[#94A3B8] dark:text-[#7893A4]">
          © 2026 BookNook
        </p>

        <p className="mt-1 text-center text-[10px] text-[#B0BCC5] dark:text-[#607D8D]">
          Made for every book lover
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open dashboard menu"
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-[#E1EAF0] bg-white text-[#063047] shadow-md transition hover:bg-[#F4F9FA] dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:text-[#E2EDF2] dark:hover:bg-[#163746] md:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-[#E1EAF0] bg-white transition-colors duration-300 dark:border-[#1E3A4A] dark:bg-[#071D2B] md:sticky md:top-0 md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close dashboard menu"
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-r border-[#E1EAF0] bg-white shadow-2xl dark:border-[#1E3A4A] dark:bg-[#071D2B]">
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="absolute right-3 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-[#607486] transition hover:bg-[#F4F9FA] dark:text-[#B6C7D2] dark:hover:bg-[#102A3A]"
            >
              <X size={20} />
            </button>

            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}