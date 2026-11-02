
import Link from "next/link";
import {
  BookOpen,
  Globe,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "All Books", href: "/books" },
    { label: "Add Book", href: "/add-book" },
  ],
  "My Library": [
    { label: "My Books", href: "/my-books" },
    { label: "My Borrows", href: "/my-borrows" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: Globe,
  },
  {
    label: "Instagram",
    href: "#",
    icon: BookOpen,
  },
  {
    label: "Twitter",
    href: "#",
    icon: MessageCircle,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#063f30] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:py-16">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="group mb-5 inline-flex items-center gap-3"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-white text-[#064b38] shadow-lg transition-transform group-hover:-rotate-3">
                <BookOpen className="size-7" />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  BookNook
                </h2>

                <p className="text-[10px] tracking-[0.25em] text-white/60">
                  YOUR LITTLE ONLINE LIBRARY
                </p>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-7 text-white/65">
              Discover your next favorite book, borrow stories
              you love, and build your own little library with
              BookNook. Your next great read is just a page away.
            </p>

            {/* Social Links */}
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Follow our journey
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                    >
                      <Icon className="size-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-sm font-semibold tracking-wide">
                {title}
              </h3>

              <div className="mb-4 h-0.5 w-8 rounded-full bg-orange-400" />

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-orange-300"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-4 border-t border-white/10 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-orange-300">
              <Mail className="size-5" />
            </div>

            <div>
              <p className="text-xs text-white/45">Email us</p>
              <p className="mt-1 text-sm text-white/80">
                support@booknook.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-orange-300">
              <Phone className="size-5" />
            </div>

            <div>
              <p className="text-xs text-white/45">Call us</p>
              <p className="mt-1 text-sm text-white/80">
                +880 1XXX-XXXXXX
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-orange-300">
              <MapPin className="size-5" />
            </div>

            <div>
              <p className="text-xs text-white/45">Our location</p>
              <p className="mt-1 text-sm text-white/80">
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-center sm:flex-row">
          <p className="text-xs text-white/50">
            © 2026 BookNook. All rights reserved.
          </p>

          <p className="text-xs text-white/50">
            Made with{" "}
            <span className="text-orange-400">♥</span>{" "}
            for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
