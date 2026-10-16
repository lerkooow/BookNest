"use client";

import { ErrorModal } from "@/components/ui/ErrorModal";
import { BooksByGenre } from "./components/BooksByGenre";
import { BooksByStatus } from "./components/BooksByStatus";
import { StatsHeader } from "./components/StatsHeader";
import { StatsLoading } from "./components/StatsLoading";
import { StatsOverview } from "./components/StatsOverview";

import { useStats } from "./hooks/useStats";

export const StatsPage = () => {
  const { loading, error, stats, chartSegments } = useStats();

  return (
    <div className="min-h-screen bg-[#faf9f6] pb-16 text-neutral-800 transition-colors duration-200">
      <StatsHeader />
      <main className="mx-auto space-y-6 px-4 py-4 sm:px-6">
        <ErrorModal key={error} message={error} />
        {loading ? (
          <StatsLoading />
        ) : error ? (
          <p
            role="alert"
            className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
          >
            Failed to load reading statistics: {error}
          </p>
        ) : (
          <>
            <StatsOverview stats={stats} />
            <BooksByStatus stats={stats} chartSegments={chartSegments} />
            <BooksByGenre genres={stats.genres} />
          </>
        )}
      </main>
    </div>
  );
};
