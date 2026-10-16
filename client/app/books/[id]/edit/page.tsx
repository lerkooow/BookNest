import { Suspense } from "react";

import { BookEditPage } from "@/components/books/BookEditPage";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      {params.then(({ id }) => (
        <BookEditPage bookId={id} />
      ))}
    </Suspense>
  );
}
