import { Search } from "lucide-react";

interface BookHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const BookHeader = ({
  searchQuery,
  setSearchQuery,
}: BookHeaderProps) => {
  return (
    <header className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 pb-4 pt-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
      <div>
        <h1
          className={`text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900`}
        >
          Library
        </h1>
        <p className="mt-0.5 text-sm text-neutral-500">
          Your books, your stories, your space
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-72">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full rounded-full border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm text-neutral-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </div>
    </header>
  );
};
