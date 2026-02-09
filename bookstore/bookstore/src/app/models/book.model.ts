export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
  isbn: string;
  stock: number;
  category: string;
  imageUrl?: string;

  pages?: number;
  description?: string;

  publisher?: string;
  language?: string;
  publicationDate?: string; // yyyy-mm-dd
  rating?: number;
  ratingCount?: number;
  available?: boolean;
  soldCount?: number;

  createdAt?: string;
  updatedAt?: string;
}
