
import { z } from "zod";

const uploadedCoverSchema = z
  .string()
  .max(2_800_000, "Uploaded cover must be 2 MB or smaller")
  .regex(
    /^data:image\/(?:jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/,
    "Cover must be a supported image data URL",
  );
const coverUrlSchema = z
  .string()
  .url()
  .refine((value) => !value.startsWith("data:"), {
    message: "Uploaded cover must use a supported image format",
  })
  .or(z.literal(""))
  .or(uploadedCoverSchema);

export const createBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  genre: z.string().trim().min(1, "Genre is required"),
  description: z.string().optional(),
  coverUrl: coverUrlSchema.optional(),
  status: z
    .enum(["WANT_TO_READ", "CURRENTLY_READING", "FINISHED"])
    .optional(),
  rating: z.number().int().min(1).max(5).optional(),
  notes: z.string().optional(),
});

export const updateBookSchema = createBookSchema
  .partial()
  .extend({
    rating: z.number().int().min(1).max(5).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });
