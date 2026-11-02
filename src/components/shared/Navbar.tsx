
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import {
  BookOpen,
  Search,
  ShoppingCart,
  UserRound,
  Heart,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = searchTerm.trim();

    if (!search) {
      router.push("/books");
      return;
    }

    router.push(`/books?search=${encodeURIComponent(search)}`);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-gray-700 shadow-sm">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-xs">
          <div className="hidden items-center gap-4 sm:flex">
            <Link href="/books" className="transition hover:text-orange-500">
              Membership
            </Link>

            <span className="text-gray-300">|</span>

            <Link href="/books" className="transition hover:text-orange-500">
              Coupons & Deals
            </Link>

            <span className="text-gray-300">|</span>

            <Link href="/books" className="transition hover:text-orange-500">
              Best Sellers
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/my-books"
              className="flex items-center gap-1 transition hover:text-orange-500"
            >
              <UserRound className="size-3.5" />
              My Account
            </Link>

            <Link
              href="/my-borrows"
              className="flex items-center gap-1 transition hover:text-orange-500"
            >
              <Heart className="size-3.5" />
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-5 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-md bg-[#0b4d3b] text-white">
            <BookOpen className="size-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold leading-5 text-[#0b4d3b]">
              BookNook
            </h1>

            <p className="text-[10px] tracking-[0.2em] text-gray-500">
              ONLINE LIBRARY
            </p>
          </div>
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden h-10 max-w-xl flex-1 items-center border border-gray-200 md:flex"
        >
          <div className="flex h-full shrink-0 items-center border-r px-3 text-xs text-gray-500">
            All Books
          </div>

          <Input
            name="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search books..."
            className="h-full rounded-none border-0 shadow-none focus-visible:ring-0"
          />

          <Button
            type="submit"
            aria-label="Search books"
            className="h-full rounded-none bg-orange-500 px-5 hover:bg-orange-600"
          >
            <Search className="size-4" />
          </Button>
        </form>

        {/* My Borrows */}
        <Link
          href="/my-borrows"
          className="hidden shrink-0 items-center gap-2 sm:flex"
        >
          <div className="relative">
            <ShoppingCart className="size-6 text-gray-700" />

            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
              0
            </span>
          </div>

          <div className="text-xs">
            <p className="font-medium text-gray-800">My Borrows</p>
            <p className="text-gray-500">Books: 0</p>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <div className="relative md:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-200 bg-white p-4 shadow-lg md:hidden">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <Input
              name="mobile-search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search books..."
              className="min-w-0"
            />

            <Button
              type="submit"
              size="icon"
              aria-label="Search books"
              className="shrink-0 bg-orange-500 hover:bg-orange-600"
            >
              <Search className="size-4" />
            </Button>
          </form>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive(link.href)
                    ? "bg-[#0b4d3b] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="hidden bg-[#064b38] md:block">
        <nav className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2 text-[11px] font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-[#0b6048] text-white"
                  : "text-white/90 hover:bg-[#0b6048] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
