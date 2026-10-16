"use client";

import { booksApi } from "@/lib/api";
import { Book, BookStatus } from "@/types/book";
import { useEffect, useMemo, useState } from "react";
import { ErrorModal } from "@/components/ui/ErrorModal";

const statusSegments: {
  status: BookStatus;
  label: string;
  color: string;
}[] = [
  { status: "FINISHED", label: "Finished", color: "#73A987" },
  {
    status: "CURRENTLY_READING",
    label: "Currently Reading",
    color: "#F1A262",
  },
  { status: "WANT_TO_READ", label: "Want to Read", color: "#4398A4" },
];

const circumference = 2 * Math.PI * 38;

export default function ReadingLibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    booksApi
      .getAll()
      .then((result) => {
        if (active) setBooks(result);
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
  }, []);

  const stats = useMemo(() => {
    const counts = {
      FINISHED: 0,
      CURRENTLY_READING: 0,
      WANT_TO_READ: 0,
    };
    const genreCounts = new Map<string, number>();

    for (const book of books) {
      counts[book.status] += 1;
      genreCounts.set(book.genre, (genreCounts.get(book.genre) ?? 0) + 1);
    }

    return {
      total: books.length,
      finished: counts.FINISHED,
      reading: counts.CURRENTLY_READING,
      want: counts.WANT_TO_READ,
      genres: Array.from(genreCounts, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    };
  }, [books]);

  const chartSegments = useMemo(() => {
    const counts: Record<BookStatus, number> = {
      FINISHED: stats.finished,
      CURRENTLY_READING: stats.reading,
      WANT_TO_READ: stats.want,
    };

    return statusSegments.map((segment, index) => {
      const count = counts[segment.status];
      const fraction = stats.total === 0 ? 0 : count / stats.total;
      const length = circumference * fraction;
      const previousCount = statusSegments
        .slice(0, index)
        .reduce((total, previous) => total + counts[previous.status], 0);
      const chartSegment = {
        ...segment,
        count,
        percentage: stats.total === 0 ? 0 : Math.round(fraction * 100),
        length,
        offset: circumference * (previousCount / (stats.total || 1)),
      };
      return chartSegment;
    });
  }, [stats]);

  return (
    <div className="min-h-screen bg-[#faf9f6] pb-16 text-neutral-800 transition-colors duration-200">
      <header className="mx-auto flex flex-col items-start justify-between gap-4 px-4 pb-4 pt-8 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Reading Stats
          </h1>
          <p className="mt-0.5 text-sm text-neutral-500">
            Your progress at a glance.
          </p>
        </div>
      </header>

      <main className="mx-auto space-y-6 px-4 py-4 sm:px-6">
        <ErrorModal key={error} message={error} />
        {loading ? (
          <div
            className="grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-4"
            role="status"
            aria-label="Loading reading statistics"
          >
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-28 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm"
              >
                <div className="h-4 w-24 rounded bg-neutral-200" />
                <div className="mt-5 h-8 w-12 rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p
            role="alert"
            className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
          >
            Failed to load reading statistics: {error}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
                  <span>Total Books</span>
                </div>
                <div className="mt-3 text-3xl font-bold text-neutral-900">
                  {stats.total}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
                <div className="text-xs font-medium text-emerald-600">
                  Finished
                </div>
                <div className="mt-3 text-3xl font-bold text-emerald-600">
                  {stats.finished}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
                <div className="text-xs font-medium text-emerald-700">
                  Reading
                </div>
                <div className="mt-3 text-3xl font-bold text-emerald-700">
                  {stats.reading}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
                <div className="text-xs font-medium text-neutral-600">
                  Want to Read
                </div>
                <div className="mt-3 text-3xl font-bold text-neutral-900">
                  {stats.want}
                </div>
              </div>
            </div>

            <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-base font-bold text-neutral-900">
                Books by Status
              </h2>
              {stats.total === 0 ? (
                <p className="py-10 text-center text-sm text-neutral-500">
                  Add books to your library to see your reading stats.
                </p>
              ) : (
                <div className="flex flex-col items-center justify-around gap-8 sm:flex-row">
                  <div
                    className="relative h-48 w-48 shrink-0"
                    role="img"
                    aria-label="Book status distribution"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="h-full w-full -rotate-90"
                    >
                      {chartSegments.map((segment) =>
                        segment.count === 0 ? null : (
                          <circle
                            key={segment.status}
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke={segment.color}
                            strokeWidth="16"
                            strokeDasharray={`${segment.length} ${circumference - segment.length}`}
                            strokeDashoffset={-segment.offset}
                          />
                        ),
                      )}
                    </svg>
                    <div className="absolute inset-0 m-auto flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-2xl font-bold text-neutral-900">
                        {stats.total}
                      </span>
                      <span className="text-xs text-neutral-500">books</span>
                    </div>
                  </div>

                  <div className="w-full space-y-4 sm:w-64">
                    {chartSegments.map((segment) => (
                      <div
                        key={segment.status}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: segment.color }}
                          />
                          <span className="text-neutral-700">
                            {segment.label}
                          </span>
                        </div>
                        <span className="font-semibold text-neutral-900">
                          {segment.count}{" "}
                          <span className="text-xs font-normal text-neutral-400">
                            ({segment.percentage}%)
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-8 text-base font-bold text-neutral-900">
                Books by Genre
              </h2>
              {stats.genres.length === 0 ? (
                <p className="py-10 text-center text-sm text-neutral-500">
                  Genre statistics will appear when books are added.
                </p>
              ) : (
                <div className="overflow-x-auto pb-2">
                  <div
                    className="grid h-56 min-w-[480px] items-end gap-3 sm:gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${stats.genres.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {stats.genres.map((genre) => {
                      const height =
                        (genre.count /
                          Math.max(...stats.genres.map((item) => item.count))) *
                        100;

                      return (
                        <div
                          key={genre.name}
                          className="flex h-full min-w-0 flex-col items-center justify-end"
                          title={`${genre.name}: ${genre.count}`}
                        >
                          <div
                            className="w-full max-w-12 rounded-t-md bg-[#619575] transition-colors hover:bg-[#528264]"
                            style={{ height: `${height}%` }}
                          />
                          <div className="mt-3 w-full text-center">
                            <p className="truncate text-[11px] font-medium text-neutral-500 sm:text-xs">
                              {genre.name}
                            </p>
                            <p className="mt-0.5 text-xs font-bold text-neutral-900">
                              {genre.count}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
