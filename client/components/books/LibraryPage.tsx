"use client";

import { BookFilters } from "./BookFilters";
import { BookHeader } from "./BookHeader";
import { BookList } from "./BookList";
import { useLibrary } from "./hooks/useLibrary";

export const LibraryPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    filteredBooks,
    getStatusBadge,
  } = useLibrary();

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
