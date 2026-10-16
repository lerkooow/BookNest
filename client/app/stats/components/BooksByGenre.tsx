import type { GenreStat } from "../hooks/useStats";

interface BooksByGenreProps {
  genres: GenreStat[];
}

export const BooksByGenre = ({ genres }: BooksByGenreProps) => (
  <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
    <h2 className="mb-8 text-base font-bold text-neutral-900">Books by Genre</h2>
    {genres.length === 0 ? (
      <p className="py-10 text-center text-sm text-neutral-500">
        Genre statistics will appear when books are added.
      </p>
    ) : (
      <div className="overflow-x-auto pb-2">
        <div
          className="grid h-56 min-w-[480px] items-end gap-3 sm:gap-6"
          style={{
            gridTemplateColumns: `repeat(${genres.length}, minmax(0, 1fr))`,
          }}
        >
          {genres.map((genre) => {
            const maxCount = Math.max(...genres.map((item) => item.count));
            const height = (genre.count / maxCount) * 100;

            return (
              <div
                key={genre.name}
                className="flex h-full min-w-0 flex-col items-center justify-end"
                title={`${genre.name}: ${genre.count}`}
              >
                <div
                  className="w-full max-w-12 rounded-t-md bg-[#619575] transition-colors hover:bg-[#528264]"
                  style={{ height: `${height}%` }}
                />
                <div className="mt-3 w-full text-center">
                  <p className="truncate text-[11px] font-medium text-neutral-500 sm:text-xs">
                    {genre.name}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-neutral-900">
                    {genre.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </section>
);
