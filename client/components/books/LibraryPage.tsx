"use client";

import { Book } from "@/types/book";
import { BookFilters } from "./BookFilters";
import { BookHeader } from "./BookHeader";
import { BookList } from "./BookList";
import { useLibrary } from "./hooks/useLibrary";
import { LibrarySkeleton } from "./LibrarySkeleton";
import { ErrorModal } from "@/components/ui/ErrorModal";

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
          <span className="whitespace-nowrap rounded-full bg-emerald-50 px-1.5 py-1 text-[9px] font-medium text-emerald-600 sm:px-2.5 sm:text-xs">
            Finished
          </span>
        );
      case "CURRENTLY_READING":
        return (
          <span className="whitespace-nowrap rounded-full bg-sky-50 px-1.5 py-1 text-[9px] font-medium text-sky-600 sm:px-2.5 sm:text-xs">
            <span className="sm:hidden">Reading</span>
            <span className="hidden sm:inline">Currently Reading</span>
          </span>
        );
      case "WANT_TO_READ":
        return (
          <span className="whitespace-nowrap rounded-full bg-rose-50 px-1.5 py-1 text-[9px] font-medium text-rose-500 sm:px-2.5 sm:text-xs">
            <span className="sm:hidden">Want</span>
            <span className="hidden sm:inline">Want to Read</span>
          </span>
        );
    }
  };

  if (loading) {
    return <LibrarySkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FCFCF9] p-8 text-neutral-700">
        <ErrorModal key={error} message={error} />
        <p
          role="alert"
          className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
        >
          Failed to load your library: {error}
        </p>
      </div>
    );
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
