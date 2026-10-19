export const LibrarySkeleton = () => (
  <div
    className="min-h-screen bg-[#FCFCF9] text-neutral-800"
    role="status"
    aria-label="Loading reading library"
    aria-busy="true"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pulse">
      <div className="w-full sm:w-auto">
        <div className="h-8 w-56 rounded bg-neutral-200" />
        <div className="mt-2 h-4 w-64 max-w-full rounded bg-neutral-200" />
      </div>
      <div className="h-10 w-full sm:w-72 rounded-full bg-neutral-200" />
    </div>

    <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-4 border-b border-neutral-200/60 px-4 py-3 pb-6 sm:px-6 md:flex-row md:items-center lg:px-8 animate-pulse">
      <div className="flex items-center gap-2 overflow-hidden pb-2 md:pb-0">
        {[96, 88, 144, 112].map((width) => (
          <div
            key={width}
            className="h-8 shrink-0 rounded-full bg-neutral-200"
            style={{ width }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-32 rounded-full bg-neutral-200" />
        <div className="h-8 w-36 rounded-full bg-neutral-200" />
      </div>
    </div>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 gap-2 animate-pulse sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-neutral-200/70 bg-white p-2 shadow-sm sm:p-4"
          >
            <div className="w-full aspect-[4/5] rounded-xl bg-neutral-200" />
            <div className="mt-4 h-4 w-3/4 rounded bg-neutral-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-neutral-200" />
            <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
              <div className="h-6 w-12 rounded-full bg-neutral-200 sm:w-24" />
              <div className="h-4 w-8 rounded bg-neutral-200 sm:w-10" />
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);
