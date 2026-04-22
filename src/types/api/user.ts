import type { Book } from "./book";

export interface UserType {
  id: string,
  top_category: string,
  top_books: Book[],
}