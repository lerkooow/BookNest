"use client";

import { useState, useMemo } from "react";
import { Book, initialBooks } from "../mockData";

export default function ReadingLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres");
  const [sortBy, setSortBy] = useState<string>("Newest");

  // Statistics calculation
  const stats = useMemo(() => {
    const total = initialBooks.length;
    const finished = initialBooks.filter((b) => b.status === "finished").length;
    const reading = initialBooks.filter((b) => b.status === "reading").length;
    const want = initialBooks.filter((b) => b.status === "want").length;

    // Genres counting
    const genreCounts: Record<string, number> = {
      Fantasy: 0,
      "Science Fiction": 0,
      Classics: 0,
      "Non-Fiction": 0,
      Other: 0,
    };

    initialBooks.forEach((b) => {
      if (genreCounts[b.genre] !== undefined) {
        genreCounts[b.genre]++;
      } else {
        genreCounts["Other"]++;
      }
    });

    return { total, finished, reading, want, genreCounts };
  }, []);

  // Filter and Sort books logic
  const filteredBooks = useMemo(() => {
    return initialBooks
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          selectedStatus === "all" || book.status === selectedStatus;
        const matchesGenre =
          selectedGenre === "All Genres" || book.genre === selectedGenre;
        return matchesSearch && matchesStatus && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === "Newest") {
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
        } else if (sortBy === "Rating: High to Low") {
          return b.rating - a.rating;
        } else if (sortBy === "Title: A to Z") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [searchQuery, selectedStatus, selectedGenre, sortBy]);

  const getStatusBadge = (status: Book["status"]) => {
    switch (status) {
      case "finished":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
            Finished
          </span>
        );
      case "reading":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-600">
            Currently Reading
          </span>
        );
      case "want":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-500">
            Want to Read
          </span>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#faf9f6] text-neutral-800 transition-colors duration-200 pb-16`}
    >
      {/* Header */}
      <header className=" mx-auto px-4 sm:px-6 pt-8 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900`}
          >
            Reading Stats
          </h1>
          <p className={`text-sm mt-0.5 text-neutral-500`}>
            Your progress at a glance.
          </p>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 py-4 space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            className={`p-5 rounded-2xl border transition bg-white border-neutral-200/80 shadow-sm`}
          >
            <div className="text-xs font-medium text-neutral-500 flex items-center justify-between">
              <span>Total Books</span>
            </div>
            <div className={`text-3xl font-bold mt-3 text-neutral-900`}>
              {stats.total}
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition bg-white border-neutral-200/80 shadow-sm`}
          >
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Finished
            </div>
            <div className="text-3xl font-bold mt-3 text-emerald-600 dark:text-emerald-400">
              {stats.finished}
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition bg-white border-neutral-200/80 shadow-sm`}
          >
            <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Reading
            </div>
            <div className="text-3xl font-bold mt-3 text-emerald-700 dark:text-emerald-400">
              {stats.reading}
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition bg-white border-neutral-200/80 shadow-sm`}
          >
            <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Want to Read
            </div>
            <div className={`text-3xl font-bold mt-3 text-neutral-900`}>
              {stats.want}
            </div>
          </div>
        </div>

        {/* Donut Chart Block - Books by Status */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border transition bg-white border-neutral-200/80 shadow-sm`}
        >
          <h2 className={`text-base font-bold mb-6 text-neutral-900`}>
            Books by Status
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
            {/* Donut Chart SVG */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Want to Read (42%) -> offset 0 */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#4398A4" // Teal
                  strokeWidth="16"
                  strokeDasharray="100.5 138.2"
                  strokeDashoffset="0"
                />
                {/* Reading (17%) -> offset ~100.5 */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#F1A262" // Orange/Amber
                  strokeWidth="16"
                  strokeDasharray="40.7 198"
                  strokeDashoffset="-100.5"
                />
                {/* Finished (42%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#73A987" // Soft Green
                  strokeWidth="16"
                  strokeDasharray="100.5 138.2"
                  strokeDashoffset="-141.2"
                />
                {/* Small Dark slice to match exact screenshot */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#1E382B" // Dark Forest
                  strokeWidth="16"
                  strokeDasharray="8 230"
                  strokeDashoffset="-241.7"
                />
              </svg>
              <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-white dark:bg-neutral-900" />
            </div>

            {/* Legend */}
            <div className="space-y-4 w-full sm:w-64">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#73A987]" />
                  <span className={"text - neutral - 700"}>Finished</span>
                </div>
                <span className={`font-semibold text-neutral-900`}>
                  {stats.finished}{" "}
                  <span className="text-xs font-normal text-neutral-400">
                    (42%)
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#F1A262]" />
                  <span className={"text-neutral-700"}>Currently Reading</span>
                </div>
                <span className={`font-semibold text-neutral-900`}>
                  {stats.reading}{" "}
                  <span className="text-xs font-normal text-neutral-400">
                    (17%)
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#4398A4]" />
                  <span className={"text-neutral-700"}>Want to Read</span>
                </div>
                <span className={`font-semibold text-neutral-900`}>
                  {stats.want}{" "}
                  <span className="text-xs font-normal text-neutral-400">
                    (42%)
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart Block - Books by Genre */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border transition bg-white border-neutral-200/80 shadow-sm`}
        >
          <h2 className={`text-base font-bold mb-8 text-neutral-900`}>
            Books by Genre
          </h2>

          <div className="relative pt-6 pb-2">
            {/* Subtle background grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-neutral-300 dark:border-neutral-700 w-full" />
              <div className="border-b border-neutral-300 dark:border-neutral-700 w-full" />
              <div className="border-b border-neutral-300 dark:border-neutral-700 w-full" />
            </div>

            {/* Bar Columns */}
            <div className="grid grid-cols-5 items-end h-40 gap-3 sm:gap-6 relative z-10">
              {[
                {
                  name: "Fantasy",
                  count: stats.genreCounts.Fantasy,
                  height: "h-32",
                },
                {
                  name: "Science Fiction",
                  count: stats.genreCounts["Science Fiction"],
                  height: "h-24",
                },
                {
                  name: "Classics",
                  count: stats.genreCounts.Classics,
                  height: "h-16",
                },
                {
                  name: "Non-Fiction",
                  count: stats.genreCounts["Non-Fiction"],
                  height: "h-10",
                },
                {
                  name: "Other",
                  count: stats.genreCounts.Other,
                  height: "h-16",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center h-full justify-end group"
                >
                  <div
                    className="w-full max-w-[48px] bg-[#619575] hover:bg-[#528264] rounded-md transition-all duration-200 cursor-pointer flex items-end justify-center"
                    style={{
                      height:
                        item.height === "h-32"
                          ? "80%"
                          : item.height === "h-24"
                            ? "60%"
                            : item.height === "h-16"
                              ? "40%"
                              : "25%",
                    }}
                  />
                  <div className="mt-4 text-center">
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-medium truncate max-w-[70px] sm:max-w-none">
                      {item.name}
                    </p>
                    <p className={`text-xs font-bold mt-0.5 text-neutral-900`}>
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
