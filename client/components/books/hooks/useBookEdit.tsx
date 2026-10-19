"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { booksApi } from "@/lib/api";

import type { Book, BookStatus } from "@/types/book";

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

export const allowedCoverTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const useBookEdit = (bookId: string) => {
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
      setSaving(false);
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

  return {
    book,
    title,
    setTitle,
    loading,
    author,
    setAuthor,
    genre,
    setGenre,
    description,
    setDescription,
    coverUrl,
    setCoverUrl,
    status,
    rating,
    setRating,
    notes,
    setNotes,
    saving,
    error,
    handleSubmit,
    handleStatusChange,
    handleCoverUpload,
    coverFileInput,
    hasCoverImage,
    genreOptions,
  };
};
