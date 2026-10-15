"use client";

import { booksApi } from "@/lib/api";
import { Book } from "@/types/book";
import { useEffect, useMemo, useState } from "react";

export const statusTabs = [
  { id: "ALL", label: "All" },
  { id: "FINISHED", label: "Finished" },
  { id: "CURRENTLY_READING", label: "Currently Reading" },
  { id: "WANT_TO_READ", label: "Want to Read" },
];

export const ALL_GENRES = "ALL";

export const useLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedGenre, setSelectedGenre] = useState<string>(ALL_GENRES);
  const [sortBy, setSortBy] = useState<string>("newest");

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const genres = useMemo(
    () => Array.from(new Set(books.map((book) => book.genre))).sort((a, b) =>
      a.localeCompare(b),
    ),
    [books],
  );

  useEffect(() => {
    booksApi
      .getAll()
      .then(setBooks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter and Sort books logic
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          selectedStatus === "ALL" || book.status === selectedStatus;
        const matchesGenre =
          selectedGenre === ALL_GENRES || book.genre === selectedGenre;
        return matchesSearch && matchesStatus && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (sortBy === "rating") {
          return (b.rating ?? 0) - (a.rating ?? 0);
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [books, searchQuery, selectedStatus, selectedGenre, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedGenre,
    setSelectedGenre,
    genres,
    sortBy,
    setSortBy,
    filteredBooks,
    loading,
    error,
  };
};
