import { CartItem } from './cart-item.model';

export interface Cart {
  id?: number;
  status: 'ACTIVE' | 'CHECKED_OUT';
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string | null;
}
