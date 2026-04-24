import type { Book } from "./book";

export interface TopBookRecommendation {
  book: Book;
  score: number;
}

export interface TopBooksResponse {
  top_books: TopBookRecommendation[];
}