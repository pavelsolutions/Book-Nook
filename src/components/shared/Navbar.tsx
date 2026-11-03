"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Menu,
  X,
  Heart,
  ShoppingCart,
  BookOpen,
} from "lucide-react";
import UserProfileDropdown from "./UserProfileDropdown";

const navLinks = [
  { name: "Membership", href: "/membership" },
  { name: "Coupons & Deals", href: "/deals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "My Account", href: "/my-account" },
  { name: "Wishlist", href: "/wishlist" },
];

const bottomLinks = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Categories", href: "/categories" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = searchValue.trim();

    if (search) {
      window.location.href = `/books?search=${encodeURIComponent(search)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top navigation */}
      <div className="hidden border-b border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <p className="text-xs text-gray-500">
            Welcome to BookNook — your next favorite book awaits!
          </p>

          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-gray-600 transition hover:text-amber-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
            <BookOpen className="h-6 w-6 text-white" />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Book<span className="text-amber-500">Nook</span>
          </span>
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden max-w-xl flex-1 md:flex"
        >
          <div className="flex w-full items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 transition focus-within:border-amber-400 focus-within:bg-white">
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search books, authors, or categories..."
              className="w-full bg-transparent px-5 py-3 text-sm text-gray-700 outline-none"
            />

            <button
              type="submit"
              aria-label="Search books"
              className="flex items-center justify-center bg-amber-500 px-5 py-3 text-white transition hover:bg-amber-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Right side actions */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden rounded-full p-2 text-gray-700 transition hover:bg-amber-50 hover:text-amber-600 sm:block"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* My Borrows */}
          <Link
            href="/my-borrows"
            className="relative flex items-center gap-2 rounded-full p-2 text-gray-700 transition hover:bg-amber-50 hover:text-amber-600"
          >
            <ShoppingCart className="h-5 w-5" />

            <span className="hidden text-sm font-medium lg:block">
              My Borrows
            </span>

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold text-white">
              0
            </span>
          </Link>

          {/* User profile dropdown */}
          <div className="hidden shrink-0 md:block">
            <UserProfileDropdown />
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-4 md:hidden">
        <form onSubmit={handleSearch}>
          <div className="flex w-full items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search books..."
              className="w-full bg-transparent px-4 py-2.5 text-sm outline-none"
            />

            <button
              type="submit"
              aria-label="Search books"
              className="bg-amber-500 px-4 py-2.5 text-white hover:bg-amber-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Desktop bottom navigation */}
      <nav className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-6 py-3">
          {bottomLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-amber-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {bottomLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 transition hover:text-amber-600"
              >
                {link.name}
              </Link>
            ))}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 transition hover:text-amber-600"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile profile dropdown */}
            <div className="py-3">
              <UserProfileDropdown />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}