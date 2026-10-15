"use client";

import { Book } from "@/types/book";
import { BookFilters } from "./BookFilters";
import { BookHeader } from "./BookHeader";
import { BookList } from "./BookList";
import { useLibrary } from "./hooks/useLibrary";
import { LibrarySkeleton } from "./LibrarySkeleton";

export const LibraryPage = () => {
  const {
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
  } = useLibrary();

  const getStatusBadge = (status: Book["status"]) => {
    switch (status) {
      case "FINISHED":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
            Finished
          </span>
        );
      case "CURRENTLY_READING":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-600">
            Currently Reading
          </span>
        );
      case "WANT_TO_READ":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-500">
            Want to Read
          </span>
        );
    }
  };

  if (loading) {
    return <LibrarySkeleton />;
  }

  if (error) {
    return <p className="p-8">Error: {error}</p>;
  }

  return (
    <div
      className={`min-h-screen bg-[#FCFCF9] text-neutral-800 transition-colors duration-200`}
    >
      {/* Header */}
      <BookHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filter & Sort Bar */}
      <BookFilters
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Book List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BookList
          filteredBooks={filteredBooks}
          getStatusBadge={getStatusBadge}
        />
      </main>
    </div>
  );
};
