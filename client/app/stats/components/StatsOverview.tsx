import type { ReadingStats } from "../hooks/useStats";

interface StatsOverviewProps {
  stats: ReadingStats;
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
        <span>Total Books</span>
      </div>
      <div className="mt-3 text-3xl font-bold text-neutral-900">
        {stats.total}
      </div>
    </div>

    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium text-emerald-600">Finished</div>
      <div className="mt-3 text-3xl font-bold text-emerald-600">
        {stats.finished}
      </div>
    </div>

    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium text-emerald-700">Reading</div>
      <div className="mt-3 text-3xl font-bold text-emerald-700">
        {stats.reading}
      </div>
    </div>

    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium text-neutral-600">Want to Read</div>
      <div className="mt-3 text-3xl font-bold text-neutral-900">
        {stats.want}
      </div>
    </div>
  </div>
);
