import type { Book } from "./book";

export interface ImplicitBookRecommendation {
  book: Book;
  score: number;
}

export interface ImplicitBooksResponse {
  similar_books: ImplicitBookRecommendation[];
}