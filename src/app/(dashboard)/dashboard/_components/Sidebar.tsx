"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BookPlus,
  BookMarked,
  LayoutDashboard,
  Library,
} from "lucide-react";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
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
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
          <Library size={22} />
        </div>

        <Link href="/dashboard" className="text-xl font-bold text-gray-900">
          Book<span className="text-green-600">Nook</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4">
        <p className="text-center text-xs text-gray-400">
          © 2026 BookNook
        </p>
      </div>
    </aside>
  );
}