import {
  circumference,
  type ReadingStats,
  type StatusChartSegment,
} from "../hooks/useStats";

interface BooksByStatusProps {
  stats: ReadingStats;
  chartSegments: StatusChartSegment[];
}

export const BooksByStatus = ({ stats, chartSegments }: BooksByStatusProps) => (
  <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
    <h2 className="mb-6 text-base font-bold text-neutral-900">
      Books by Status
    </h2>
    {stats.total === 0 ? (
      <p className="py-10 text-center text-sm text-neutral-500">
        Add books to your library to see your reading stats.
      </p>
    ) : (
      <div className="flex flex-col items-center justify-around gap-8 sm:flex-row">
        <div
          className="relative h-48 w-48 shrink-0"
          role="img"
          aria-label="Book status distribution"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            {chartSegments.map((segment) =>
              segment.count === 0 ? null : (
                <circle
                  key={segment.status}
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth="16"
                  strokeDasharray={`${segment.length} ${circumference - segment.length}`}
                  strokeDashoffset={-segment.offset}
                />
              ),
            )}
          </svg>
          <div className="absolute inset-0 m-auto flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-bold text-neutral-900">
              {stats.total}
            </span>
            <span className="text-xs text-neutral-500">books</span>
          </div>
        </div>

        <div className="w-full space-y-4 sm:w-64">
          {chartSegments.map((segment) => (
            <div
              key={segment.status}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-neutral-700">{segment.label}</span>
              </div>
              <span className="font-semibold text-neutral-900">
                {segment.count}{" "}
                <span className="text-xs font-normal text-neutral-400">
                  ({segment.percentage}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
);
