"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    BookOpen,
    Search,
    Heart,
    ShoppingCart,
    Menu,
    X,
    UserRound,
    UserCircle,
    LogOut,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    LayoutGrid,
    ChevronDown,
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

const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
];

const privateLinks = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
];

const TEAL = "#086781";
const TEAL_HOVER = "#05546A";

export default function Navbar() {
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const [searchValue, setSearchValue] = useState("");
    const [searchCategory, setSearchCategory] = useState("category");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const user = session?.user;
    const isLoggedIn = Boolean(user);

    const userName = user?.name || "User";
    const userEmail = user?.email || "";
    const userImage = user?.image || "";

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const search = searchValue.trim();

        if (!search) return;

        const params = new URLSearchParams();
        params.set("search", search);
        params.set("by", searchCategory);

        router.push(`/books?${params.toString()}`);
        setMobileMenuOpen(false);
    };

    // const handleLogout = async () => {
    //     try {
    //         await authClient.signOut();
    //         setMobileMenuOpen(false);
    //         router.push("/");
    //         router.refresh();
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     }
    // };

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            setMobileMenuOpen(false);

            // Reload the app after logout so the navbar gets the updated session
            window.location.replace("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navLinkClass = (href: string) =>
        `flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors ${isActive(href)
            ? "text-[#086781]"
            : "text-slate-800 hover:text-[#086781]"
        }`;

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            {/* Top contact strip */}
            <div className="bg-[#086781] text-white">
                <div className="mx-auto flex min-h-[52px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    {/* Contact information */}
                    <div className="hidden items-center divide-x divide-white/40 md:flex">
                        <a
                            href="tel:+8801234567890"
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

                    {/* Top right actions */}
                    <div className="ml-auto flex items-center gap-5">
                        <a
                            href="mailto:info@booknook.com"
                            className="hidden items-center gap-2 text-sm transition hover:text-white/75 sm:flex"
                        >
                            {/* <MessageCircle className="h-4 w-4" /> */}
                            {/* <span>Live Chat</span> */}
                        </a>

                        {!isPending && !isLoggedIn && (
                            <Link
                                href="/sign-in"
                                className="flex items-center gap-2 text-sm transition hover:text-white/75"
                            >
                                <UserRound className="h-4 w-4" />
                                <span>Login</span>
                            </Link>
                        )}

                        {!isPending && isLoggedIn && (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="flex cursor-pointer items-center gap-2 text-sm transition hover:text-white/75 focus:outline-none"
                                    aria-label="Open user profile menu"
                                >
                                    <Avatar className="h-7 w-7 border border-white/40">
                                        <AvatarImage src={userImage || undefined} alt={userName} />

                                        <AvatarFallback className="bg-white text-xs font-semibold text-[#086781]">
                                            {userName?.charAt(0).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="hidden sm:inline">{userName}</span>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={8}
                                    className="z-[100] w-60 bg-white text-slate-900"
                                >
                                    <DropdownMenuLabel>
                                        <p className="truncate text-sm font-semibold">
                                            {userName}
                                        </p>

                                        <p className="truncate text-xs font-normal text-slate-500">
                                            {userEmail}
                                        </p>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => router.push("/my-profile")}
                                    >
                                        <UserCircle className="mr-2 h-4 w-4" />
                                        My Profile
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600 focus:text-red-600"
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

            {/* Main navigation row */}
            <div className="border-b border-slate-100">
                <div className="mx-auto flex min-h-[106px] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                    {/* Desktop links */}
                    <nav className="hidden shrink-0 items-center gap-7 xl:flex">
                        {publicLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={navLinkClass(link.href)}
                            >
                                {link.name}

                                {/* {link.name === "Home" && (
                  <ChevronDown className="h-4 w-4" />
                )} */}
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

                    {/* Mobile logo */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2 xl:hidden"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#086781]">
                            <BookOpen className="h-5 w-5 text-white" />
                        </div>

                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            Book<span className="text-[#086781]">Nook</span>
                        </span>
                    </Link>

                    {/* Search bar */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden min-w-0 max-w-[570px] flex-1 lg:flex"
                    >
                        <div className="flex h-[58px] w-full overflow-hidden rounded-full border border-slate-300 bg-white">
                            {/* Search type selector */}
                            <div className="flex shrink-0 items-center gap-2 border-r border-slate-300 px-4">
                                <LayoutGrid className="h-4 w-4 text-[#086781]" />

                                <select
                                    value={searchCategory}
                                    onChange={(event) =>
                                        setSearchCategory(event.target.value)
                                    }
                                    aria-label="Search by"
                                    className="max-w-[105px] cursor-pointer bg-transparent text-sm text-slate-800 outline-none"
                                >
                                    <option value="category">Category</option>
                                    <option value="title">Book Title</option>
                                    <option value="author">Author</option>
                                </select>

                                {/* <ChevronDown className="h-4 w-4 text-slate-700" /> */}
                            </div>

                            {/* Search input */}
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                placeholder={
                                    searchCategory === "author"
                                        ? "Search author"
                                        : searchCategory === "title"
                                            ? "Search book title"
                                            : "Search category"
                                }
                                aria-label="Search books"
                                className="min-w-0 flex-1 bg-transparent px-5 text-sm text-slate-800 outline-none placeholder:text-slate-500"
                            />

                            <button
                                type="submit"
                                aria-label="Search"
                                className="flex w-14 shrink-0 items-center justify-center text-slate-800 transition hover:text-[#086781]"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </form>

                    {/* Right action icons */}
                    <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                        {/* Wishlist */}
                        {/* <Link
              href={isLoggedIn ? "/wishlist" : "/login"}
              aria-label="Wishlist"
              className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full border border-slate-300 text-slate-800 transition hover:border-[#086781] hover:text-[#086781]"
            >
              <Heart className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#086781] px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </Link> */}

                        {/* My Borrows */}
                        <Link
                            href={isLoggedIn ? "/my-borrows" : "/login"}
                            aria-label="My Borrows"
                            className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full border border-slate-300 text-slate-800 transition hover:border-[#086781] hover:text-[#086781]"
                        >
                            <ShoppingCart className="h-5 w-5" />

                            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#086781] px-1 text-[10px] font-semibold text-white">
                                0
                            </span>
                        </Link>

                        {/* Desktop profile */}
                        {!isPending && isLoggedIn && (
                            <div className="hidden xl:block">
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border border-slate-300 text-slate-800 transition hover:border-[#086781] hover:bg-white hover:text-[#086781] focus:outline-none"
                                        aria-label="Open profile menu"
                                    >
                                        <UserRound className="h-5 w-5" />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        className="w-60 bg-white text-slate-900"
                                    >
                                        <DropdownMenuLabel>
                                            <p className="truncate text-sm font-semibold">
                                                {userName}
                                            </p>
                                            <p className="truncate text-xs font-normal text-slate-500">
                                                {userEmail}
                                            </p>
                                        </DropdownMenuLabel>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem>
                                            <Link href="/my-profile">
                                                <UserCircle className="mr-2 h-4 w-4" />
                                                My Profile
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}

                        {/* Mobile menu */}
                        <Sheet
                            open={mobileMenuOpen}
                            onOpenChange={setMobileMenuOpen}
                        >
                            <SheetTrigger
                                className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-slate-300 text-slate-800 transition hover:border-[#086781] hover:bg-white hover:text-[#086781]"
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
                                className="w-[310px] bg-white text-slate-900 sm:w-[360px]"
                            >
                                <SheetHeader className="border-b border-slate-100 pb-5 text-left">
                                    <SheetTitle className="flex items-center gap-2 text-xl text-slate-900">
                                        <BookOpen className="h-6 w-6 text-[#086781]" />
                                        Book<span className="text-[#086781]">Nook</span>
                                    </SheetTitle>
                                </SheetHeader>

                                {/* Mobile profile info */}
                                {isLoggedIn && (
                                    <div className="my-5 flex items-center gap-3 rounded-lg bg-[#eaf5f7] p-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={userImage} alt={userName} />
                                            <AvatarFallback className="bg-[#086781] text-white">
                                                {userName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold">
                                                {userName}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                {userEmail}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Mobile search */}
                                <form onSubmit={handleSearch} className="my-5">
                                    <div className="flex h-11 overflow-hidden rounded-full border border-slate-300">
                                        <input
                                            value={searchValue}
                                            onChange={(event) =>
                                                setSearchValue(event.target.value)
                                            }
                                            placeholder="Search books"
                                            className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                                        />

                                        <Button
                                            type="submit"
                                            size="icon"
                                            className="h-full w-11 rounded-none bg-[#086781] text-white hover:bg-[#05546A]"
                                            aria-label="Search"
                                        >
                                            <Search className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </form>

                                {/* Mobile links */}
                                <nav className="flex flex-col">
                                    {[...publicLinks, ...(isLoggedIn ? privateLinks : [])].map(
                                        (link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={closeMobileMenu}
                                                className={`border-b border-slate-100 py-3 text-sm font-medium transition ${isActive(link.href)
                                                    ? "text-[#086781]"
                                                    : "text-slate-700 hover:text-[#086781]"
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        )
                                    )}

                                    {isLoggedIn && (
                                        <Link
                                            href="/my-profile"
                                            onClick={closeMobileMenu}
                                            className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#086781]"
                                        >
                                            My Profile
                                        </Link>
                                    )}
                                </nav>

                                {/* Mobile authentication */}
                                {!isPending && !isLoggedIn && (
                                    <div className="mt-6 flex flex-col gap-3">
                                        <Button
                                            variant="outline"
                                            className="border-[#086781] text-[#086781] hover:bg-[#eaf5f7]"
                                        >
                                            <Link href="/login" onClick={closeMobileMenu}>
                                                Login
                                            </Link>
                                        </Button>

                                        <Button
                                            className="bg-[#086781] text-white hover:bg-[#05546A]"
                                        >
                                            <Link href="/register" onClick={closeMobileMenu}>
                                                Register
                                            </Link>
                                        </Button>
                                    </div>
                                )}

                                {isLoggedIn && (
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline"
                                        className="mt-6 w-full border-red-200 text-red-600 hover:bg-red-50"
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