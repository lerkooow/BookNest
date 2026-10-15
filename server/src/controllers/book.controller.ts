import type { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../services/book.service.js";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema.js";

export async function listBooks(_req: Request, res: Response) {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch {
    res.status(500).json({ message: "Failed to fetch books" });
  }
}

export async function getBook(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const book = await getBookById(id);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.json(book);
  } catch {
    res.status(500).json({ message: "Failed to fetch book" });
  }
}

export async function addBook(req: Request, res: Response) {
  try {
    const data = createBookSchema.parse(req.body);
    const book = await createBook(data);

    res.status(201).json(book);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Invalid book data",
        errors: error.flatten(),
      });
      return;
    }

    res.status(500).json({ message: "Failed to create book" });
  }
}

export async function editBook(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const data = updateBookSchema.parse(req.body);
    const book = await updateBook(id, data);

    res.json(book);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Invalid book data",
        errors: error.flatten(),
      });
      return;
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(500).json({ message: "Failed to update book" });
  }
}

export async function removeBook(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteBook(id);
    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(500).json({ message: "Failed to delete book" });
  }
}