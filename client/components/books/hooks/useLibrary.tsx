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

export const useLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres");
  const [sortBy, setSortBy] = useState<string>("Newest");

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          selectedGenre === "All Genres" || book.genre === selectedGenre;
        return matchesSearch && matchesStatus && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === "Newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (sortBy === "Rating: High to Low") {
          return (b.rating ?? 0) - (a.rating ?? 0);
        } else if (sortBy === "Title: A to Z") {
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
    sortBy,
    setSortBy,
    filteredBooks,
    loading,
    error,
  };
};
