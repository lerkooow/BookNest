"use client";

import { booksApi } from "@/lib/api";
import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Edit3,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorModal } from "@/components/ui/ErrorModal";

const statusLabels: Record<Book["status"], string> = {
  FINISHED: "Finished",
  CURRENTLY_READING: "Currently Reading",
  WANT_TO_READ: "Want to Read",
};

const statusStyles: Record<Book["status"], string> = {
  FINISHED: "bg-emerald-50 text-emerald-700",
  CURRENTLY_READING: "bg-sky-50 text-sky-700",
  WANT_TO_READ: "bg-amber-50 text-amber-700",
};

const hasCoverImage = (coverUrl: string | null): coverUrl is string =>
  !!coverUrl &&
  (coverUrl.startsWith("data:image/") ||
    coverUrl.startsWith("http://") ||
    coverUrl.startsWith("https://"));

export const BookDetailPage = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    booksApi
      .getById(bookId)
      .then((result) => {
        if (active) setBook(result);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [bookId]);

  const handleDelete = async () => {
    if (!book || !window.confirm(`Delete "${book.title}" from your library?`)) {
      return;
    }

    setDeleting(true);
    setError("");
    try {
      await booksApi.delete(book.id);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete book");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#FCFCF9] p-6 md:p-10">
        <div className="mx-auto">
          <div className="h-5 w-28 rounded bg-neutral-200" />
          <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">
            <div className="aspect-[4/5] rounded-2xl bg-neutral-200" />
            <div className="space-y-5">
              <div className="h-8 w-2/3 rounded bg-neutral-200" />
              <div className="h-5 w-1/3 rounded bg-neutral-200" />
              <div className="h-28 rounded-xl bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !book) {
    return (
      <div className="min-h-screen bg-[#FCFCF9] p-6 md:p-10">
        <ErrorModal key={error} message={error} />
        <div className="mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={16} /> Back to Library
          </Link>
          <p
            role="alert"
            className="mt-8 rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen bg-[#FCFCF9] px-4 py-6 text-neutral-800 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            <ArrowLeft size={16} /> Back to Library
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/books/${book.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-neutral-50"
            >
              <Edit3 size={15} /> Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 shadow-sm transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-60"
            >
              <Trash2 size={15} /> {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-12">
          <div className="mx-auto w-full max-w-[260px]">
            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 shadow-lg ${hasCoverImage(book.coverUrl) ? "bg-neutral-100" : (book.coverUrl ?? "bg-gradient-to-br from-amber-100 to-orange-200")}`}
            >
              {hasCoverImage(book.coverUrl) ? (
                <Image
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 80vw, 260px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">
                    {book.genre}
                  </span>
                  <span className="font-serif text-2xl font-bold leading-tight">
                    {book.title}
                  </span>
                  <span className="text-sm">{book.author}</span>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-neutral-500">{book.author}</p>

            <span
              className={`mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[book.status]}`}
            >
              {statusLabels[book.status]}
            </span>

            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 border-b border-neutral-200 pb-6">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <BookOpen size={17} className="text-neutral-400" />
                <span>{book.genre}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Star size={17} className="text-amber-400" />
                <span>{book.rating ? `${book.rating} / 5` : "Not rated"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <CalendarDays size={17} className="text-neutral-400" />
                <span>
                  Added {new Date(book.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <section className="mt-7">
              <h2 className="text-lg font-semibold text-neutral-900">
                About this book
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {book.description?.trim() ||
                  "No description has been added yet."}
              </p>
            </section>

            <section className="mt-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Notes
                </h2>
                <Link
                  href={`/books/${book.id}/edit`}
                  className="text-sm font-medium text-emerald-800 hover:underline"
                >
                  Edit notes
                </Link>
              </div>
              <div className="mt-3 min-h-24 whitespace-pre-wrap rounded-xl border border-neutral-200 bg-white p-4 text-sm leading-6 text-neutral-600">
                {book.notes?.trim() || (
                  <span className="text-neutral-400">
                    Add your thoughts about this book...
                  </span>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <ErrorModal key={error} message={error} />
    </div>
  );
};
