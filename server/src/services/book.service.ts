import { prisma } from "../lib/prisma.js";

type CreateBookInput = {
  title: string;
  author: string;
  genre: string;
  description?: string;
  coverUrl?: string;
  status?: "WANT_TO_READ" | "CURRENTLY_READING" | "FINISHED";
  rating?: number;
  notes?: string;
};

export const getAllBooks = () => {
  return prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getBookById = (id: string) => {
  return prisma.book.findUnique({
    where: { id },
  });
};

export const createBook = (data: CreateBookInput) => {
  return prisma.book.create({
    data,
  });
};

export const updateBook = (
  id: string,
  data: Omit<Partial<CreateBookInput>, "rating"> & {
    rating?: number | null;
  },
) => {
  return prisma.book.update({
    where: { id },
    data,
  });
};

export const deleteBook = (id: string) => {
  return prisma.book.delete({
    where: { id },
  });
};
