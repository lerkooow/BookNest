
import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  genre: z.string().trim().min(1, "Genre is required"),
  coverUrl: z.string().url().optional().or(z.literal("")),
  status: z
    .enum(["WANT_TO_READ", "CURRENTLY_READING", "FINISHED"])
    .optional(),
  rating: z.number().int().min(1).max(5).optional(),
  notes: z.string().optional(),
});

export const updateBookSchema = createBookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });
