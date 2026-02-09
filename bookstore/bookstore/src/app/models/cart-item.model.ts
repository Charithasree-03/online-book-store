import { Book } from './book.model';

export interface CartItem {
  id?: number;
  book: Book;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}
