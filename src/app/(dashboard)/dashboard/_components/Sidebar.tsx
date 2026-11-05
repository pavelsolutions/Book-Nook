"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BookPlus,
  BookMarked,
  LayoutDashboard,
  Library,
  ChevronRight,
  Sparkles,
  Home,
  LogOutIcon,
  User2Icon,
  User,
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
  // {
  //   title: "Logout",
  //   href: "/dashboard/logout",
  //   icon: LogOutIcon,
  // },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#E1EAF0] bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-[#E8EEF2] px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6F83] text-white shadow-md shadow-[#0B6F83]/15">
            <Library size={22} strokeWidth={1.8} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#102A43]">
              Book
              <span className="text-[#20B8C4]">Nook</span>
            </h1>

            <p className="mt-0.5 text-[10px] font-medium tracking-wide text-[#718096]">
              Your cozy corner for books
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-7">
        <div className="mb-5 flex items-center justify-between px-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#94A3B8]">
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
              className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#EAF6F7] text-[#0B6F83]"
                  : "text-[#607486] hover:bg-[#F4F9FA] hover:text-[#0B6F83]"
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#0B6F83]" />
              )}

              <Icon
                size={19}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-[#0B6F83]"
                    : "text-[#8AA0AE] group-hover:text-[#0B6F83]"
                }`}
              />

              <span className="flex-1">{item.title}</span>

              {isActive && (
                <ChevronRight
                  size={16}
                  className="text-[#20B8C4]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Library Promo */}
      <div className="px-4 pb-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B6F83] to-[#087D91] p-4 text-white">
          <div className="relative z-10">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <BookOpen size={19} />
            </div>

            <h3 className="text-sm font-semibold">
              Keep Reading!
            </h3>

            <p className="mt-1 text-xs leading-5 text-white/75">
              Every book opens a new world of knowledge.
            </p>

            <Link
              href="/books"
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
      <div className="border-t border-[#E8EEF2] px-4 py-5">
        <p className="text-center text-xs font-medium text-[#94A3B8]">
          © 2026 BookNook
        </p>

        <p className="mt-1 text-center text-[10px] text-[#B0BCC5]">
          Made for every book lover
        </p>
      </div>
    </aside>
  );
}