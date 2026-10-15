"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ImageIcon, ChevronDown, Star, Upload, ArrowLeft } from "lucide-react";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Want to Read");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Обработка загрузки файла
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  // Обработка ссылки на URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoverUrl(value);
    if (value.trim()) {
      setPreviewImage(value);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      genre,
      status,
      rating,
      notes,
      cover: previewImage || coverUrl,
    };
    console.log("Book submitted:", newBook);
    // Добавьте логику сохранения (API / state management)
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
            {/* Левая колонка: Загрузка обложки */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full border border-slate-200/80 rounded-2xl p-4 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
                <div className="relative aspect-[5/4] w-full rounded-xl bg-[#F8FAFC] border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Cover preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 text-slate-500">
                        <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <p className="text-xs text-slate-400 max-w-[160px] leading-relaxed mb-4">
                        Upload cover image or enter URL
                      </p>
                      <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-[#EAEFE9] hover:bg-[#E0E8DF] text-slate-700 text-xs font-medium rounded-full transition-colors">
                        Choose file
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </>
                  )}
                </div>

                {/* Разделитель "or" */}
                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <span className="relative bg-white px-3 text-[11px] text-slate-400">
                    or
                  </span>
                </div>

                {/* Поле ввода URL обложки */}
                <input
                  type="text"
                  placeholder="https://example.com/cover.jpg"
                  value={coverUrl}
                  onChange={handleUrlChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
                />
              </div>
            </div>

            {/* Правая колонка: Пола формы */}
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
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all pr-10 cursor-pointer"
                  >
                    <option value="" disabled hidden>
                      Select genre
                    </option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Business">Business</option>
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
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all pr-10 cursor-pointer font-medium"
                  >
                    <option value="Want to Read">🟠 Want to Read</option>
                    <option value="Currently Reading">
                      🔵 Currently Reading
                    </option>
                    <option value="Finished">🟢 Finished</option>
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
              className="px-6 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#23533E] text-white font-medium text-xs transition-colors shadow-sm"
            >
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
