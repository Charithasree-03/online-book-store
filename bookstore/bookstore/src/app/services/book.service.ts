import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private base = environment.apiBaseUrl + '/api/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> { return this.http.get<Book[]>(this.base); }
  getById(id: number): Observable<Book> { return this.http.get<Book>(`${this.base}/${id}`); }

  search(keyword: string): Observable<Book[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Book[]>(`${this.base}/search`, { params });
  }

  add(book: Book): Observable<Book> { return this.http.post<Book>(this.base, book); }
  update(id: number, book: Book): Observable<Book> { return this.http.put<Book>(`${this.base}/${id}`, book); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.base}/${id}`, { responseType: 'text' as any }); }
}
