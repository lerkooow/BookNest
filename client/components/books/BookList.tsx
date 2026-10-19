import { Book } from "@/types/book";
import { Star } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";

interface BookListProps {
  filteredBooks: Book[];
  getStatusBadge: (status: Book["status"]) => JSX.Element;
}

export const BookList = ({ filteredBooks, getStatusBadge }: BookListProps) => {
  const hasCoverImage = (coverUrl: string | null): coverUrl is string =>
    !!coverUrl &&
    (coverUrl.startsWith("data:image/") ||
      coverUrl.startsWith("http://") ||
      coverUrl.startsWith("https://"));

  return (
    <>
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-lg">No books found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex min-w-0 flex-col justify-between rounded-2xl border border-neutral-200/70 bg-white p-2 shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 sm:p-4"
            >
              <div>
                <div
                  className={`relative flex w-full aspect-[4/5] flex-col justify-between overflow-hidden rounded-xl p-2 shadow-inner sm:p-6 ${hasCoverImage(book.coverUrl) ? "bg-neutral-100" : (book.coverUrl ?? "bg-gradient-to-br from-amber-100 to-orange-200")}`}
                >
                  {hasCoverImage(book.coverUrl) && (
                    <Image
                      src={book.coverUrl}
                      alt={`${book.title} cover`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 25vw"
                      className="object-cover"
                    />
                  )}
                  <div>
                    <span
                      className={`text-[8px] tracking-widest uppercase font-bold md:text-[10px]`}
                    >
                      {book.genre}
                    </span>
                    <h2 className="mt-1 break-words text-base font-serif font-bold leading-tight sm:text-2xl">
                      {book.title}
                    </h2>
                  </div>
                </div>
                <div className="mt-4">
                  <h3
                    className={`font-semibold text-sm truncate text-neutral-900`}
                  >
                    {book.title}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-neutral-500">
                    {book.author}
                  </p>
                  <span className="line-clamp-2 break-words text-[10px] font-bold uppercase tracking-widest">
                    {book.genre}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-1 border-t border-neutral-100 pt-2 sm:mt-4 sm:pt-3">
                {getStatusBadge(book.status)}
                <div className="flex shrink-0 items-center gap-1 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className={"text-neutral-700"}>
                    {book.rating?.toFixed(1) ?? "—"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
