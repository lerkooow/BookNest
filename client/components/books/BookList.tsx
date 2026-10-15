import type { Book } from "@/app/mockData";
import { Star } from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface BookListProps {
  filteredBooks: Book[];
  getStatusBadge: (status: Book["status"]) => JSX.Element;
}

export const BookList = ({ filteredBooks, getStatusBadge }: BookListProps) => {
  return (
    <>
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-lg">No books found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={`rounded-2xl p-4 border shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white border-neutral-200/70`}
            >
              <div>
                {/* Cover Card */}
                <div
                  className={`w-full aspect-[4/5] rounded-xl p-6 flex flex-col justify-between relative overflow-hidden shadow-inner ${book.coverBg}`}
                >
                  <div>
                    <span
                      className={`text-[10px] tracking-widest uppercase font-bold ${book.coverTextColor}`}
                    >
                      {book.genre}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold mt-2 leading-tight">
                      {book.title}
                    </h2>
                  </div>
                  <div className="text-[11px] opacity-80 leading-tight">
                    {book.author}
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
                    {book.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
