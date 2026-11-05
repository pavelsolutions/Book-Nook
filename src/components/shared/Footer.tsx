import Link from "next/link";
import {
  BookOpen,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Heart,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const footerLinks = {
  "Our Links": [
    { label: "Home", href: "/" },
    { label: "All Books", href: "/books" },
    { label: "Add Book", href: "/add-book" },
  ],

  "My Library": [
    { label: "My Books", href: "/my-books" },
    { label: "My Borrows", href: "/my-borrows" },
  ],

  Resources: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "#",
    icon: FaYoutube,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#063047] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#16A6B8]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#16A6B8]/10 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto bg-[#063047] max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:py-14">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* BookNook Logo */}
            <Link
              href="/"
              aria-label="BookNook Home"
              className="group mb-5 inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white transition-transform duration-300 group-hover:-rotate-3">
                <BookOpen
                  className="h-7 w-7 text-[#16A6B8]"
                  strokeWidth={2.2}
                />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-[25px] font-extrabold tracking-tight">
                  <span className="text-white">Book</span>
                  <span className="text-[#16A6B8]">Nook</span>
                </span>

                <span className="mt-1 text-[10px] font-medium tracking-wide text-white/60">
                  YOUR LITTLE ONLINE LIBRARY
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-white/65">
              Discover your next favorite book, borrow stories
              you love, and build your own little library with
              BookNook. Your next great read is just a page away.
            </p>

            {/* Social Links */}
            <div className="mt-6">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#16A6B8] transition-all duration-300 hover:-translate-y-1 hover:bg-[#16A6B8] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-base font-semibold text-white">
                {title}
              </h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-[#16A6B8]"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#16A6B8] transition-transform group-hover:translate-x-1" />

                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-white">
              Get in Touch With Us
            </h3>

            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#16A6B8]" />

                <p className="text-sm leading-6 text-white/65">
                  Bangladesh
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-[#16A6B8]" />

                <div className="flex flex-col text-sm leading-6 text-white/65">
                  <a
                    href="tel:+8801736110558"
                    className="transition-colors hover:text-[#16A6B8]"
                  >
                    +880 1736-110558
                  </a>

                  <a
                    href="tel:+8801736110558"
                    className="transition-colors hover:text-[#16A6B8]"
                  >
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-6 w-6 shrink-0 text-[#16A6B8]" />

                <div className="flex flex-col text-sm leading-6 text-white/65">
                  <a
                    href="mailto:support@booknook.com"
                    className="break-all transition-colors hover:text-[#16A6B8]"
                  >
                    support@booknook.com
                  </a>

                  <a
                    href="mailto:info@booknook.com"
                    className="break-all transition-colors hover:text-[#16A6B8]"
                  >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t bg-[#036280] border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs leading-6 text-white/100">
            BookNook Book Library - ©{" "}
            {new Date().getFullYear()} All Rights Reserved
          </p>

          <p className="inline-flex items-center gap-1.5 text-xs text-white/500">
            Made with
            <Heart className="h-3.5 w-3.5 fill-[#16A6B8] text-[#16A6B8]" />
            by
            <span className="font-medium text-[#ffffff]">
              BookNook
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}