"use client";

import { booksApi } from "@/lib/api";
import { Book, BookStatus } from "@/types/book";
import { useEffect, useMemo, useState } from "react";

export interface GenreStat {
  name: string;
  count: number;
}

export interface ReadingStats {
  total: number;
  finished: number;
  reading: number;
  want: number;
  genres: GenreStat[];
}

export interface StatusChartSegment {
  status: BookStatus;
  label: string;
  color: string;
  count: number;
  percentage: number;
  length: number;
  offset: number;
}

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

export const circumference = 2 * Math.PI * 38;

export const useStats = () => {
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

    const result: ReadingStats = {
      total: books.length,
      finished: counts.FINISHED,
      reading: counts.CURRENTLY_READING,
      want: counts.WANT_TO_READ,
      genres: Array.from(genreCounts, ([name, count]) => ({
        name,
        count,
      })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    };
    return result;
  }, [books]);

  const chartSegments = useMemo<StatusChartSegment[]>(() => {
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

  return { loading, error, stats, chartSegments };
};
