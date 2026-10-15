import { Suspense } from "react";
import { BookDetailPage } from "@/components/books/BookDetailPage";

export default function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main
          role="status"
          aria-label="Loading book"
          className="min-h-screen animate-pulse bg-[#FCFCF9] px-4 py-6 md:px-10 md:py-10"
        >
          <div className="mx-auto max-w-5xl">
            <div className="h-5 w-28 rounded bg-neutral-200" />
            <div className="mt-8 grid gap-10 md:grid-cols-[260px_1fr]">
              <div className="aspect-[4/5] rounded-2xl bg-neutral-200" />
              <div className="space-y-5">
                <div className="h-8 w-2/3 rounded bg-neutral-200" />
                <div className="h-5 w-1/3 rounded bg-neutral-200" />
                <div className="h-28 rounded-xl bg-neutral-200" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      {params.then(({ id }) => (
        <BookDetailPage bookId={id} />
      ))}
    </Suspense>
  );
}