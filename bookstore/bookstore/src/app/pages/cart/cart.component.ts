import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Cart = { status: 'ACTIVE', items: [] };
  loading = false;
  err = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.load();
  }

  get total(): number {
    return (this.cart.items || []).reduce((s, it) => s + (it.subTotal || 0), 0);
  }

  load() {
    this.loading = true;
    this.err = '';
    this.cartService.getMyCart().subscribe({
      next: (c) => { this.cart = c; this.loading = false; },
      error: (e) => { this.err = e?.error?.message || 'Failed to load cart'; this.loading = false; }
    });
  }

  updateQty(bookId: number, qty: number) {
    this.cartService.updateQty(bookId, qty).subscribe({
      next: (c) => this.cart = c,
      error: (e) => alert(e?.error?.message || 'Update failed')
    });
  }

  remove(bookId: number) {
    this.cartService.remove(bookId).subscribe({
      next: (c) => this.cart = c,
      error: (e) => alert(e?.error?.message || 'Remove failed')
    });
  }

  clear() {
    this.cartService.clear().subscribe({
      next: (c) => this.cart = c,
      error: (e) => alert(e?.error?.message || 'Clear failed')
    });
  }
}
