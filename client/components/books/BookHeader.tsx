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
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1
          className={`text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900`}
        >
          My Reading Library
        </h1>
        <p className={`text-sm mt-0.5 text-neutral-500"`}>
          Your books, your stories, your space.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 sm:w-72">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or author..."
          className={`w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 shadow-sm transition ${"bg-white border-neutral-200 text-neutral-900"}`}
        />
      </div>
    </header>
  );
};
