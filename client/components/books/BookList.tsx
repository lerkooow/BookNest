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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="rounded-2xl p-4 border shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white border-neutral-200/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
            >
              <div>
                {/* Cover Card */}
                <div
                  className={`w-full aspect-[4/5] rounded-xl p-6 flex flex-col justify-between relative overflow-hidden shadow-inner ${hasCoverImage(book.coverUrl) ? "bg-neutral-100" : (book.coverUrl ?? "bg-gradient-to-br from-amber-100 to-orange-200")}`}
                >
                  {hasCoverImage(book.coverUrl) && (
                    <Image
                      src={book.coverUrl}
                      alt={`${book.title} cover`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 25vw"
                      className="object-cover"
                    />
                  )}
                  <div>
                    <span
                      className={`text-[10px] tracking-widest uppercase font-bold`}
                    >
                      {book.genre}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold mt-2 leading-tight">
                      {book.title}
                    </h2>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4">
                  <h3
                    className={`font-semibold text-sm truncate text-neutral-900`}
                  >
                    {book.title}
                  </h3>
                  <p className={`text-xs mt-0.5 text-neutral-500`}>
                    {book.author}
                  </p>
                  <span
                    className={`text-[10px] tracking-widest uppercase font-bold`}
                  >
                    {book.genre}
                  </span>
                </div>
              </div>

              {/* Status & Rating */}
              <div
                className={`flex items-center justify-between mt-4 pt-3 border-t border-neutral-100`}
              >
                {getStatusBadge(book.status)}
                <div className="flex items-center gap-1 text-xs font-semibold">
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
