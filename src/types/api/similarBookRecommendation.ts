import type { Book } from "./book";

export interface SimilarBookRecommendation {
  book: Book;
  similarity_score: number;
}

export interface SimilarBooksResponse {
  similar_books: SimilarBookRecommendation[];
}