"use client";

import { booksApi } from "@/lib/api";
import { BookStatus, CreateBookInput } from "@/types/book";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const genresData: string[] = [
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

export const useAddBooks = () => {
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
      setSaving(false);
      setTitle("");
      setAuthor("");
      setGenre("");
      setStatus("WANT_TO_READ");
      setRating(0);
      setHoverRating(0);
      setDescription("");
      setNotes("");
      setCoverUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add book");
      setSaving(false);
    }
  };

  return {
    title,
    setTitle,
    author,
    setAuthor,
    genre,
    setGenre,
    status,
    handleStatusChange,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    description,
    setDescription,
    notes,
    setNotes,
    coverUrl,
    setCoverUrl,
    saving,
    error,
    setError,
    handleSubmit,
  };
};
