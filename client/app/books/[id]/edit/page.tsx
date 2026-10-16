import { Suspense } from "react";
import { BookEditPage } from "@/components/books/BookEditPage";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <main
          role="status"
          aria-label="Loading book editor"
          className="min-h-screen animate-pulse bg-[#FCFCF9] px-4 py-6 md:px-10 md:py-10"
        >
          <div className="mx-auto space-y-5">
            <div className="h-5 w-28 rounded bg-neutral-200" />
            <div className="h-10 w-2/3 rounded bg-neutral-200" />
            <div className="h-72 rounded-2xl bg-neutral-200" />
          </div>
        </main>
      }
    >
      {params.then(({ id }) => (
        <BookEditPage bookId={id} />
      ))}
    </Suspense>
  );
}
