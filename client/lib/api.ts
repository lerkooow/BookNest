
import type {
  Book,
  CreateBookInput,
  UpdateBookInput,
} from "../types/book";

const configuredApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, "");
const API_URL = /\/api$/i.test(normalizedApiUrl)
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message ?? `Request failed: ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const booksApi = {
  getAll: () => request<Book[]>("/books"),

  getById: (id: string) =>
    request<Book>(`/books/${id}`),

  create: (data: CreateBookInput) =>
    request<Book>("/books", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateBookInput) =>
    request<Book>(`/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<void>(`/books/${id}`, {
      method: "DELETE",
    }),
};
