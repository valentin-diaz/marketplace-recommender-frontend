import type { Book } from "./book";

export interface ImplicitBookRecommendation {
  book: Book;
  predicted_rating: number;
}

export interface ImplicitBooksResponse {
  similar_books: ImplicitBookRecommendation[];
}