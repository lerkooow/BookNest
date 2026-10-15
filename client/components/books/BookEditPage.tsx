"use client";

import { booksApi } from "@/lib/api";
import { Book, BookStatus } from "@/types/book";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10";

const genres = [
  "Romance",
  "Mystery, Thriller, & Crime",
  "Fantasy & Science Fiction",
  "Non-Fiction & Self-Help",
  "Historical Fiction",
  "Young Adult",
  "Biography, Autobiography, & Memoir",
  "Children’s Literature",
  "Religion & Spirituality",
  "Other",
];
const maxCoverSize = 2 * 1024 * 1024;
const allowedCoverTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const BookEditPage = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const coverFileInput = useRef<HTMLInputElement>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<BookStatus>("WANT_TO_READ");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    booksApi
      .getById(bookId)
      .then((result) => {
        if (!active) return;
        setBook(result);
        setTitle(result.title);
        setAuthor(result.author);
        setGenre(result.genre);
        setDescription(result.description ?? "");
        setCoverUrl(result.coverUrl ?? "");
        setStatus(result.status);
        setRating(result.rating?.toString() ?? "");
        setNotes(result.notes ?? "");
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!book) return;

    setSaving(true);
    setError("");
    try {
      await booksApi.update(book.id, {
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
        description: description.trim(),
        coverUrl: coverUrl.trim(),
        status,
        rating: rating ? Number(rating) : null,
        notes,
      });
      router.push(`/books/${book.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update book");
      setSaving(false);
    }
  };

  const handleStatusChange = (value: string) => {
    if (
      value === "WANT_TO_READ" ||
      value === "CURRENTLY_READING" ||
      value === "FINISHED"
    ) {
      setStatus(value);
    }
  };

  const handleCoverUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!allowedCoverTypes.includes(file.type)) {
      setError("Choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > maxCoverSize) {
      setError("The cover image must be 2 MB or smaller.");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCoverUrl(reader.result);
      } else {
        setError("Could not read the selected image.");
      }
    };
    reader.onerror = () => setError("Could not read the selected image.");
    reader.readAsDataURL(file);
  };

  const hasCoverImage =
    coverUrl.startsWith("data:image/") ||
    coverUrl.startsWith("http://") ||
    coverUrl.startsWith("https://");
  const genreOptions =
    genre && !genres.includes(genre) ? [genre, ...genres] : genres;

  if (loading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#FCFCF9] p-6 md:p-10">
        <div className="mx-auto space-y-5">
          <div className="h-6 w-32 rounded bg-neutral-200" />
          <div className="h-10 w-2/3 rounded bg-neutral-200" />
          <div className="h-72 rounded-2xl bg-neutral-200" />
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#FCFCF9] p-6 md:p-10">
        <p
          role="alert"
          className="mx-auto rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
        >
          {error || "Book not found"}
        </p>
        <div className="mx-auto mt-5 max-w-3xl">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
          >
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCF9] px-4 py-6 text-neutral-800 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto">
        <Link
          href={`/books/${book.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft size={16} /> Back to book
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Edit book
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Update the details in your library.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Title
              <input
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Author
              <input
                required
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Genre
              <select
                required
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select genre
                </option>
                {genreOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Status
              <select
                value={status}
                onChange={(event) => handleStatusChange(event.target.value)}
                className={inputClass}
              >
                <option value="WANT_TO_READ">Want to Read</option>
                <option value="CURRENTLY_READING">Currently Reading</option>
                <option value="FINISHED">Finished</option>
              </select>
            </label>
          </div>

          <label className="block space-y-2 text-sm font-medium text-neutral-700">
            Description
            <textarea
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write a short description of the book..."
              className={`${inputClass} resize-y`}
            />
          </label>

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-neutral-700">Cover</h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div
                className={`relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-xl border border-black/5 shadow-inner ${
                  hasCoverImage
                    ? "bg-neutral-100"
                    : coverUrl || "bg-gradient-to-br from-amber-100 to-orange-200"
                }`}
              >
                {hasCoverImage ? (
                  <Image
                    src={coverUrl}
                    alt={`${title} cover preview`}
                    fill
                    unoptimized
                    sizes="144px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between p-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {genre}
                    </span>
                    <span className="font-serif text-lg font-bold leading-tight">
                      {title}
                    </span>
                    <span className="text-xs opacity-80">{author}</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <label className="block space-y-2 text-sm font-medium text-neutral-700">
                  Cover image URL
                  <input
                    type="url"
                    value={coverUrl.startsWith("data:image/") ? "" : coverUrl}
                    onChange={(event) => setCoverUrl(event.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    className={inputClass}
                  />
                </label>
                <input
                  ref={coverFileInput}
                  type="file"
                  accept={allowedCoverTypes.join(",")}
                  onChange={handleCoverUpload}
                  className="sr-only"
                  tabIndex={-1}
                  aria-label="Choose a cover image file"
                />
                <button
                  type="button"
                  onClick={() => coverFileInput.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  <Upload size={16} />
                  Upload from device
                </button>
                <p className="text-xs text-neutral-500">
                  JPEG, PNG, WebP, or GIF. Maximum file size: 2 MB.
                </p>
              </div>
            </div>
          </section>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-neutral-700">
              Rating
            </legend>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setRating(rating === String(star) ? "" : String(star))
                  }
                  aria-label={`${star} star${star === 1 ? "" : "s"}`}
                  aria-pressed={Number(rating) === star}
                  className="rounded p-1 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-emerald-700"
                >
                  <Star
                    className={`size-6 ${star <= Number(rating) ? "fill-amber-400 text-amber-400" : "text-neutral-300"}`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs text-neutral-500">
                Click a selected star to clear your rating.
              </span>
            </div>
          </fieldset>

          <label className="block space-y-2 text-sm font-medium text-neutral-700">
            Notes
            <textarea
              rows={5}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add your thoughts about this book..."
              className={`${inputClass} resize-y`}
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
            >
              {error}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-100 pt-5">
            <Link
              href={`/books/${book.id}`}
              className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#2D6A4F] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#23533E] disabled:cursor-wait disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
