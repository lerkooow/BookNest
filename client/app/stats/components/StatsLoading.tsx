export const StatsLoading = () => (
  <div
    className="grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-4"
    role="status"
    aria-label="Loading reading statistics"
  >
    {Array.from({ length: 4 }, (_, index) => (
      <div
        key={index}
        className="h-28 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm"
      >
        <div className="h-4 w-24 rounded bg-neutral-200" />
        <div className="mt-5 h-8 w-12 rounded bg-neutral-200" />
      </div>
    ))}
  </div>
);
