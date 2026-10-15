export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: "want" | "reading" | "finished";
  rating: number;
  dateAdded: string;
  coverBg: string;
  coverTextColor: string;
}

export const initialBooks: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    status: "finished",
    rating: 4.5,
    dateAdded: "2026-01-01",
    coverBg: "bg-amber-50 border border-amber-100 text-neutral-900",
    coverTextColor: "text-amber-800/60",
  },
  {
    id: "2",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    status: "reading",
    rating: 4.0,
    dateAdded: "2026-01-05",
    coverBg: "bg-slate-900 text-white",
    coverTextColor: "text-cyan-300/80",
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    status: "want",
    rating: 4.5,
    dateAdded: "2026-01-10",
    coverBg:
      "bg-gradient-to-t from-orange-900 via-amber-700 to-orange-500 text-white",
    coverTextColor: "text-amber-100/70",
  },
  {
    id: "4",
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Sci-Fi",
    status: "finished",
    rating: 5.0,
    dateAdded: "2026-01-02",
    coverBg: "bg-neutral-950 border border-neutral-800 text-amber-400",
    coverTextColor: "text-neutral-400",
  },
  {
    id: "5",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Fiction",
    status: "want",
    rating: 4.0,
    dateAdded: "2026-01-12",
    coverBg: "bg-emerald-950 text-emerald-200",
    coverTextColor: "text-emerald-300/60",
  },
  {
    id: "6",
    title: "Normal People",
    author: "Sally Rooney",
    genre: "Fiction",
    status: "reading",
    rating: 4.0,
    dateAdded: "2026-01-06",
    coverBg: "bg-cyan-700 text-cyan-100",
    coverTextColor: "text-cyan-200/80",
  },
  {
    id: "7",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Fiction",
    status: "finished",
    rating: 4.5,
    dateAdded: "2026-01-03",
    coverBg: "bg-amber-800 text-amber-100",
    coverTextColor: "text-amber-200/80",
  },
  {
    id: "8",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Non-Fiction",
    status: "want",
    rating: 4.2,
    dateAdded: "2026-01-15",
    coverBg: "bg-neutral-100 border border-neutral-200 text-neutral-900",
    coverTextColor: "text-neutral-500",
  },
];
