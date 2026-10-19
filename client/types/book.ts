
export type BookStatus =
  | "WANT_TO_READ"
  | "CURRENTLY_READING"
  | "FINISHED";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string | null;
  coverUrl: string | null;
  status: BookStatus;
  rating: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateBookInput =  {
  title: string;
  author: string;
  genre: string;
  description?: string;
  coverUrl?: string;
  status?: BookStatus;
  rating?: number;
  notes?: string;
}

export type UpdateBookInput = Omit<Partial<CreateBookInput>, "rating"> & {
  rating?: number | null;
};
