import { ChevronDown } from "lucide-react";

import { ALL_GENRES, statusTabs } from "./hooks/useLibrary";

interface BookFiltersProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  genres: string[];
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const BookFilters = ({
  selectedStatus,
  setSelectedStatus,
  selectedGenre,
  setSelectedGenre,
  genres,
  sortBy,
  setSortBy,
}: BookFiltersProps) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-4 border-b border-neutral-200/60 px-4 py-3 pb-6 sm:px-6 md:flex-row md:items-center lg:px-8">
      {/* Status Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedStatus(tab.id)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-neutral-200 bg-white py-1.5 pl-4 pr-8 text-sm text-neutral-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-400"
          >
            <option value={ALL_GENRES}>All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-neutral-200 bg-white py-1.5 pl-4 pr-8 text-sm text-neutral-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-400"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="rating">Rating: High to Low</option>
            <option value="title">Title: A to Z</option>
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
