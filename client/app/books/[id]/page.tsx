import { Suspense } from "react";

import { BookDetailPage } from "@/components/books/BookDetailPage";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      {params.then(({ id }) => (
        <BookDetailPage bookId={id} />
      ))}
    </Suspense>
  );
}
