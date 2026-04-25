import type { Book } from "./book";

export interface TopBookRecommendation {
  book: Book;
  predicted_rating: number;
}

export interface TopBooksResponse {
  top_books: TopBookRecommendation[];
}