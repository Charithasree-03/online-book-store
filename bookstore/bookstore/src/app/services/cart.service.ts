import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { Cart } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = `${environment.apiBaseUrl}/api/cart`;

  private _count = new BehaviorSubject<number>(0);
  count$ = this._count.asObservable();

  constructor(private http: HttpClient) {}

  private setCount(cart: Cart | null) {
    const c = cart?.items?.reduce((sum, it) => sum + (it.quantity || 0), 0) ?? 0;
    this._count.next(c);
  }

  refresh() {
    return this.getMyCart().subscribe({ next: () => {}, error: () => this._count.next(0) });
  }

  reset() {
    this._count.next(0);
  }

  getMyCart() {
    return this.http.get<Cart>(this.api).pipe(tap(cart => this.setCount(cart)));
  }

  add(bookId: number, qty: number) {
    return this.http.post<Cart>(`${this.api}/add?bookId=${bookId}&qty=${qty}`, {})
      .pipe(tap(cart => this.setCount(cart)));
  }

  updateQty(bookId: number, qty: number) {
    return this.http.put<Cart>(`${this.api}/qty?bookId=${bookId}&qty=${qty}`, {})
      .pipe(tap(cart => this.setCount(cart)));
  }

  remove(bookId: number) {
    return this.http.delete<Cart>(`${this.api}/remove?bookId=${bookId}`)
      .pipe(tap(cart => this.setCount(cart)));
  }

  clear() {
    return this.http.delete<Cart>(`${this.api}/clear`)
      .pipe(tap(cart => this.setCount(cart)));
  }
}
