import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { BookService } from '../../../services/book.service';
import { CartService } from '../../../services/cart.service';
import { Book } from '../../../models/book.model';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  keyword = '';
  loading = false;
  err = '';

  qty: Record<number, number> = {}; // ✅ store qty per bookId

  constructor(
    private service: BookService,
    private cart: CartService,
    public token: TokenService
  ) {}

  ngOnInit(): void { this.loadAll(); }

  loadAll() {
    this.loading = true;
    this.err = '';
    this.service.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.books = data ?? [];
          // default qty = 1 for each book
          for (const b of this.books) {
            if (b.id != null && this.qty[b.id] == null) this.qty[b.id] = 1;
          }
        },
        error: (e) => this.err = e?.error?.message || e?.message || 'Failed to load books'
      });
  }

  search() {
    const k = this.keyword.trim();
    if (!k) { this.loadAll(); return; }

    this.loading = true;
    this.err = '';
    this.service.search(k)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.books = data ?? [],
        error: (e) => this.err = e?.error?.message || e?.message || 'Search failed'
      });
  }

  addToCart(b: Book) {
    if (!b.id) return;

    const q = Math.max(1, Number(this.qty[b.id] || 1));
    const max = b.stock ?? 999999;
    if (q > max) { alert(`Only ${max} stock available`); return; }

    this.cart.add(b.id, q).subscribe({
      next: () => alert('Added to cart ✅'),
      error: (e) => alert(e?.error?.message || 'Add to cart failed')
    });
  }

  deleteBook(id?: number) {
    if (!id) return;
    if (!confirm('Delete this book?')) return;

    this.service.delete(id).subscribe({
      next: () => this.loadAll(),
      error: (e) => alert(e?.error?.message || 'Delete failed')
    });
  }
}










// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { BookService } from '../../../services/book.service';
// import { Book } from '../../../models/book.model';
// import { TokenService } from '../../../core/services/token.service';
// import { finalize } from 'rxjs/operators';

// @Component({
//   selector: 'app-book-list',
//   standalone: true,
//   imports: [CommonModule, RouterLink, FormsModule],
//   templateUrl: './book-list.component.html'
// })
// export class BookListComponent implements OnInit {
//   books: Book[] = [];
//   keyword = '';
//   loading = false;
//   err = '';

//   constructor(private service: BookService, public token: TokenService) {}

//   ngOnInit(): void { this.loadAll(); }

//   loadAll() {
//     this.loading = true;
//     this.err = '';
//     this.service.getAll()
//       .pipe(finalize(() => this.loading = false))
//       .subscribe({
//         next: (data) => this.books = data ?? [],
//         error: (e) => {
//           console.error('GET /books error:', e);
//           this.err = e?.error?.message || e?.message || 'Failed to load books';
//         }
//       });
//   }

//   search() {
//     const k = this.keyword.trim();
//     if (!k) { this.loadAll(); return; }

//     this.loading = true;
//     this.err = '';
//     this.service.search(k)
//       .pipe(finalize(() => this.loading = false))
//       .subscribe({
//         next: (data) => this.books = data ?? [],
//         error: (e) => {
//           console.error('SEARCH /books error:', e);
//           this.err = e?.error?.message || e?.message || 'Search failed';
//         }
//       });
//   }

//   deleteBook(id?: number) {
//     if (!id) return;
//     if (!confirm('Delete this book?')) return;

//     this.service.delete(id).subscribe({
//       next: () => this.loadAll(),
//       error: (e) => {
//         console.error('DELETE /books error:', e);
//         alert(e?.error?.message || 'Delete failed');
//       }
//     });
//   }
// }
