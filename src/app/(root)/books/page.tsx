import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BooksClient from "@/components/books/BooksClient";
import { IBook } from "@/types/types";

export const metadata: Metadata = {
  title: "All Books | BookNook",
  description: "Explore the BookNook library and find your next favorite read.",
};

async function getBooks(): Promise<IBook[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_BASE_URL is not configured");
  }

  const response = await fetch(`${baseUrl}/books`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function BooksPage() {
  const books = await getBooks();

  return <BooksClient books={books} />;
}