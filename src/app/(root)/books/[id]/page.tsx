import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Tag,
  CalendarDays,
  Hash,
  LibraryBig,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Book = {
  _id: string;
  title: string;
  description?: string;
  author: string;
  category: string;
  image: string;
  addedDate?: string;
};

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch book details");
  }

  const book: Book = await res.json();

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/books" className="hover:text-primary">
                Library
              </Link>
              <span>/</span>
              <span>Book Details</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Book Details
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View information and details about this book.
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Link>
          </Button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Cover Card */}
            <Card>
              <CardContent className="p-5">
                <div className="flex justify-center rounded-xl bg-muted/50 p-5">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-[340px] w-full max-w-[250px] rounded-lg object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-[340px] w-full max-w-[250px] items-center justify-center rounded-lg bg-muted">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-3">
                  <Badge variant="secondary">
                    {book.category}
                  </Badge>

                  <h2 className="text-xl font-semibold leading-snug">
                    {book.title}
                  </h2>

                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserRound className="h-4 w-4" />
                    {book.author}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Quick Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Category
                    </p>
                    <p className="text-sm font-medium">
                      {book.category}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Author
                    </p>
                    <p className="text-sm font-medium">
                      {book.author}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Book ID
                    </p>
                    <p className="break-all text-sm font-medium">
                      {book._id}
                    </p>
                  </div>
                </div>

                {book.addedDate && (
                  <>
                    <Separator />

                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Added Date
                        </p>
                        <p className="text-sm font-medium">
                          {new Date(book.addedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Overview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <LibraryBig className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <CardTitle>Book Overview</CardTitle>
                    <CardDescription>
                      General information about the selected book
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      Book Title
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {book.title}
                    </h2>
                  </div>

                  <Separator />

                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      Author
                    </p>
                    <p className="text-base font-semibold">
                      {book.author}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      Category
                    </p>
                    <Badge variant="outline" className="px-3 py-1">
                      {book.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card>
              <CardHeader>
                <CardTitle>About This Book</CardTitle>
                <CardDescription>
                  Description and summary
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                  {book.description ||
                    "No description is available for this book."}
                </p>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Continue exploring your library
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/books">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse All Books
                  </Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}