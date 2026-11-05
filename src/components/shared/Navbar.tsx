"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  BookOpen,
  Search,
  ShoppingCart,
  Menu,
  X,
  UserRound,
  UserCircle,
  LogOut,
  Phone,
  Mail,
  Clock,
  LayoutDashboard,
} from "lucide-react";

import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FaRegistered } from "react-icons/fa";
import ThemeToggle from "../theme/theme-toggle";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const privateLinks = [
  { name: "Add Book", href: "/dashboard/add-book" },
  { name: "My Books", href: "/dashboard/my-books" },
  { name: "My Borrows", href: "/dashboard/my-borrows" },
];

const TEAL = "#086781";
const TEAL_HOVER = "#05546A";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [borrowCount, setBorrowCount] = useState(0);

  const user = session?.user;
  const isLoggedIn = Boolean(user);

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const userImage = user?.image || "";

  // Fetch current user's borrow records
  useEffect(() => {
    if (!userEmail) {
      setBorrowCount(0);
      return;
    }

    let isMounted = true;

    const fetchBorrowCount = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

        if (!apiUrl) {
          throw new Error(
            "NEXT_PUBLIC_SERVER_BASE_URL is not configured"
          );
        }

        const response = await fetch(
          `${apiUrl}/my-borrows/${encodeURIComponent(userEmail)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const borrows = await response.json();

        if (isMounted) {
          const count = Array.isArray(borrows)
            ? borrows.filter(
                (borrow) => borrow.status === "borrowed"
              ).length
            : 0;

          setBorrowCount(count);
        }
      } catch (error) {
        console.error("Fetch borrow count error:", error);

        if (isMounted) {
          setBorrowCount(0);
        }
      }
    };

    // Load count when Navbar mounts or user changes
    fetchBorrowCount();

    // Refresh count after a successful borrow
    window.addEventListener("borrow-updated", fetchBorrowCount);

    return () => {
      isMounted = false;
      window.removeEventListener("borrow-updated", fetchBorrowCount);
    };
  }, [userEmail]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const search = searchValue.trim();

    if (!search) return;

    const params = new URLSearchParams();
    params.set("search", search);

    router.push(`/books?${params.toString()}`);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setBorrowCount(0);
      setMobileMenuOpen(false);
      window.location.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkClass = (href: string) =>
    `flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors ${
      isActive(href)
        ? "text-[#086781] dark:text-[#20B8C4]"
        : "text-slate-800 hover:text-[#086781] dark:text-slate-200 dark:hover:text-[#20B8C4]"
    }`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-slate-900 shadow-sm transition-colors duration-300 dark:bg-[#071D2B] dark:text-slate-100">
      {/* Top Contact Strip */}
      <div className="bg-[#086781] text-white transition-colors duration-300 dark:bg-[#102A3A]">
        <div className="mx-auto flex min-h-[52px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Contact Information */}
          <div className="hidden items-center divide-x divide-white/40 md:flex">
            <a
              href="tel:+8801736110558"
              className="flex items-center gap-2 px-4 text-sm transition hover:text-white/75"
            >
              <Phone className="h-4 w-4" />
              <span>+880 1736-110558</span>
            </a>

            <a
              href="mailto:info@booknook.com"
              className="flex items-center gap-2 px-5 text-sm transition hover:text-white/75"
            >
              <Mail className="h-4 w-4" />
              <span>info@booknook.com</span>
            </a>

            <div className="flex items-center gap-2 px-5 text-sm">
              <Clock className="h-4 w-4" />
              <span>Sunday - Fri: 9 AM - 6 PM</span>
            </div>
          </div>

          {/* Top Right Actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {!isPending && !isLoggedIn && (
              <>
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 text-sm transition hover:text-white/75"
                >
                  <UserRound className="h-4 w-4" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 text-sm transition hover:text-white/75"
                >
                  <FaRegistered className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}

            {!isPending && isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex cursor-pointer items-center gap-2 text-sm transition hover:text-white/75 focus:outline-none"
                  aria-label="Open user profile menu"
                >
                  <Avatar className="h-7 w-7 border border-white/40">
                    <AvatarImage
                      src={userImage || undefined}
                      alt={userName}
                    />

                    <AvatarFallback className="bg-white text-xs font-semibold text-[#086781]">
                      {userName.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden sm:inline">
                    {userName}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="z-[100] w-60 border-slate-200 bg-white text-slate-900 dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:text-slate-100"
                >
                  <DropdownMenuLabel>
                    <p className="truncate text-sm font-semibold">
                      {userName}
                    </p>

                    <p className="truncate text-xs font-normal text-slate-500 dark:text-slate-400">
                      {userEmail}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-[#1E3A4A]" />

                  <DropdownMenuItem
                    className="cursor-pointer focus:bg-slate-100 dark:focus:bg-[#103746]"
                    onClick={() => router.push("/dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer focus:bg-slate-100 dark:focus:bg-[#103746]"
                    onClick={() =>
                      router.push("/dashboard/my-profile")
                    }
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-[#1E3A4A]" />

                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-slate-100 transition-colors duration-300 dark:border-[#1E3A4A]">
        <div className="mx-auto flex min-h-[106px] w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* BookNook Logo */}
          <Link
            href="/"
            aria-label="BookNook Home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#063047] transition-colors duration-300 dark:bg-[#103746]">
              <BookOpen
                className="h-6 w-6 text-[#16A6B8]"
                strokeWidth={2.2}
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[25px] font-extrabold tracking-tight">
                <span className="text-[#063047] dark:text-slate-100">
                  Book
                </span>
                <span className="text-[#16A6B8]">Nook</span>
              </span>

              <span className="mt-1 text-[10px] font-medium tracking-wide text-[#063047]/70 dark:text-slate-400">
                Your cozy corner for books
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden shrink-0 items-center gap-7 xl:flex">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn &&
              privateLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkClass(link.href)}
                >
                  {link.name}
                </Link>
              ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            {/* My Borrows */}
            <Link
              href={
                isLoggedIn
                  ? "/dashboard/my-borrows"
                  : "/sign-in"
              }
              aria-label={`My Borrows: ${borrowCount} books`}
              className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full border border-slate-300 text-slate-800 transition hover:border-[#086781] hover:text-[#086781] dark:border-[#1E3A4A] dark:text-slate-200 dark:hover:border-[#20B8C4] dark:hover:text-[#20B8C4]"
            >
              <ShoppingCart className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#086781] px-1 text-[10px] font-semibold text-white dark:bg-[#16A6B8]">
                {borrowCount}
              </span>
            </Link>

            {/* Desktop Profile */}
            {!isPending && isLoggedIn && (
              <div className="hidden xl:block">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border border-slate-300 text-slate-800 transition hover:border-[#086781] hover:text-[#086781] focus:outline-none dark:border-[#1E3A4A] dark:text-slate-200 dark:hover:border-[#20B8C4] dark:hover:text-[#20B8C4]"
                    aria-label="Open profile menu"
                  >
                    <UserRound className="h-5 w-5" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-60 border-slate-200 bg-white text-slate-900 dark:border-[#1E3A4A] dark:bg-[#102A3A] dark:text-slate-100"
                  >
                    <DropdownMenuLabel>
                      <p className="truncate text-sm font-semibold">
                        {userName}
                      </p>

                      <p className="truncate text-xs font-normal text-slate-500 dark:text-slate-400">
                        {userEmail}
                      </p>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-[#1E3A4A]" />

                    <DropdownMenuItem
                      className="cursor-pointer focus:bg-slate-100 dark:focus:bg-[#103746]"
                      onClick={() =>
                        router.push("/dashboard/my-profile")
                      }
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      My Profile
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-[#1E3A4A]" />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet
              open={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            >
              <SheetTrigger
                className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-slate-300 text-slate-800 transition hover:border-[#086781] hover:text-[#086781] dark:border-[#1E3A4A] dark:text-slate-200 dark:hover:border-[#20B8C4] dark:hover:text-[#20B8C4]"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[310px] border-slate-200 bg-white text-slate-900 dark:border-[#1E3A4A] dark:bg-[#071D2B] dark:text-slate-100 sm:w-[360px]"
              >
                <SheetHeader className="border-b border-slate-100 pb-5 text-left dark:border-[#1E3A4A]">
                  <SheetTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-slate-100">
                    <BookOpen className="h-6 w-6 text-[#086781] dark:text-[#20B8C4]" />
                    Book
                    <span className="text-[#086781] dark:text-[#20B8C4]">
                      Nook
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Theme Toggle */}
                <div className="mx-3 mt-4 flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-[#1E3A4A] dark:bg-[#102A3A]">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Appearance
                  </span>

                  <ThemeToggle />
                </div>

                {/* Mobile Profile Info */}
                {isLoggedIn && (
                  <div className="mx-3 my-5 flex items-center gap-3 rounded-lg bg-[#eaf5f7] p-3 dark:bg-[#102A3A]">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={userImage || undefined}
                        alt={userName}
                      />

                      <AvatarFallback className="bg-[#086781] text-white">
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {userName}
                      </p>

                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile Search */}
                <form
                  onSubmit={handleSearch}
                  className="mx-3 my-5"
                >
                  <div className="flex h-11 overflow-hidden rounded-full border border-slate-300 dark:border-[#1E3A4A] dark:bg-[#102A3A]">
                    <input
                      value={searchValue}
                      onChange={(event) =>
                        setSearchValue(event.target.value)
                      }
                      placeholder="Search books"
                      aria-label="Search books"
                      className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />

                    <Button
                      type="submit"
                      size="icon"
                      className="h-full w-11 rounded-none bg-[#086781] text-white hover:bg-[#05546A] dark:bg-[#16A6B8] dark:hover:bg-[#20B8C4]"
                      aria-label="Search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                {/* Mobile Navigation Links */}
                <nav className="mx-3 flex flex-col">
                  {[
                    ...publicLinks,
                    ...(isLoggedIn ? privateLinks : []),
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`border-b border-slate-100 py-3 text-sm font-medium transition dark:border-[#1E3A4A] ${
                        isActive(link.href)
                          ? "text-[#086781] dark:text-[#20B8C4]"
                          : "text-slate-700 hover:text-[#086781] dark:text-slate-200 dark:hover:text-[#20B8C4]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {isLoggedIn && (
                    <Link
                      href="/dashboard/my-profile"
                      onClick={closeMobileMenu}
                      className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#086781] dark:border-[#1E3A4A] dark:text-slate-200 dark:hover:text-[#20B8C4]"
                    >
                      My Profile
                    </Link>
                  )}
                </nav>

                {/* Mobile Authentication */}
                {!isPending && !isLoggedIn && (
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/sign-in"
                      onClick={closeMobileMenu}
                      className="flex h-10 items-center justify-center rounded-md border border-[#086781] px-4 text-sm font-medium text-[#086781] hover:bg-[#eaf5f7] dark:border-[#20B8C4] dark:text-[#20B8C4] dark:hover:bg-[#102A3A]"
                    >
                      Login
                    </Link>

                    <Link
                      href="/sign-up"
                      onClick={closeMobileMenu}
                      className="flex h-10 items-center justify-center rounded-md bg-[#086781] px-4 text-sm font-medium text-white hover:bg-[#05546A] dark:bg-[#16A6B8] dark:hover:bg-[#20B8C4]"
                    >
                      Register
                    </Link>
                  </div>
                )}

                {isLoggedIn && (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="mx-3 mt-6 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}