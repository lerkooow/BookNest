"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ImageIcon, ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { booksApi } from "@/lib/api";
import { BookStatus, CreateBookInput } from "@/types/book";

export default function AddBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<BookStatus>("WANT_TO_READ");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleStatusChange = (value: string) => {
    if (
      value === "WANT_TO_READ" ||
      value === "CURRENTLY_READING" ||
      value === "FINISHED"
    ) {
      setStatus(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const newBook: CreateBookInput = {
      title: title.trim(),
      author: author.trim(),
      genre,
      status,
      description: description.trim(),
      notes: notes.trim(),
      ...(rating > 0 ? { rating } : {}),
      ...(coverUrl.trim() ? { coverUrl: coverUrl.trim() } : {}),
    };

    try {
      const createdBook = await booksApi.create(newBook);
      router.push(`/books/${createdBook.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add book");
      setSaving(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#FCFCF9] text-neutral-800 transition-colors duration-200`}
    >
      <div className="w-full p-8 ">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Add a New Book
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Fill in the details to add a book to your library.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Cover */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full border border-slate-200/80 rounded-2xl p-4 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
                <div className="relative aspect-[5/4] w-full rounded-xl bg-[#F8FAFC] border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt="Book cover preview"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 90vw, 40vw"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 text-slate-500">
                        <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <p className="text-xs text-slate-400 max-w-[160px] leading-relaxed mb-4">
                        Add a cover image URL below
                      </p>
                    </>
                  )}
                </div>

                <input
                  type="url"
                  placeholder="https://example.com/cover.jpg"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  aria-label="Cover image URL"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
                />
              </div>
            </div>

            {/* Book details */}
            <div className="md:col-span-7 flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
                />
              </div>

              {/* Author */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
                />
              </div>

              {/* Genre Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Genre
                </label>
                <div className="relative">
                  <select
                    required
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all pr-10 cursor-pointer"
                  >
                    <option value="" disabled hidden>
                      Select genre
                    </option>
                    <option value="Romance">Romance</option>
                    <option value="Mystery, Thriller, & Crime">
                      Mystery, Thriller, & Crime
                    </option>
                    <option value="Fantasy & Science Fiction">
                      Fantasy & Science Fiction
                    </option>
                    <option value="Non-Fiction & Self-Help">
                      Non-Fiction & Self-Help
                    </option>
                    <option value="Historical Fiction">
                      Historical Fiction
                    </option>
                    <option value="Young Adult">Young Adult</option>
                    <option value="Biography, Autobiography, & Memoir">
                      Biography, Autobiography, & Memoir
                    </option>
                    <option value="Children’s Literature">
                      Children’s Literature
                    </option>
                    <option value="Religion & Spirituality">
                      Religion & Spirituality
                    </option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all pr-10 cursor-pointer font-medium"
                  >
                    <option value="WANT_TO_READ">🟠 Want to Read</option>
                    <option value="CURRENTLY_READING">
                      🔵 Currently Reading
                    </option>
                    <option value="FINISHED">🟢 Finished</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  Rating{" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200 fill-slate-50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Description{" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="A short description of the book..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all resize-y"
                />
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  Notes{" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Add your thoughts..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
            >
              {error}
            </p>
          )}

          {/* Кнопки действий (Cancel / Save Book) */}
          <div className="flex items-center justify-end gap-3 mt-10 pt-4 border-t border-slate-50">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-xs hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              aria-busy={saving}
              className="px-6 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#23533E] text-white font-medium text-xs transition-colors shadow-sm disabled:cursor-wait disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
