import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  id?: number;
  isEdit = false;

  book: Book = {
    title: '',
    author: '',
    price: 0,
    isbn: '',
    stock: 0,
    category: '',
    imageUrl: '',
    pages: 0,
    description: '',
    publisher: '',
    language: '',
    publicationDate: '',
    rating: 0,
    ratingCount: 0,
    available: true,
    soldCount: 0
  };

  err = '';
  msg = '';

  constructor(private route: ActivatedRoute, private router: Router, private service: BookService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
      this.service.getById(this.id).subscribe({
        next: data => this.book = { ...data },
        error: () => this.err = 'Failed to load book'
      });
    }
  }

  save() {
    this.err = ''; this.msg = '';
    if (this.isEdit && this.id) {
      this.service.update(this.id, this.book).subscribe({
        next: () => { this.msg = 'Updated successfully'; this.router.navigate(['/books', this.id]); },
        error: e => this.err = e?.error?.message || 'Update failed'
      });
    } else {
      this.service.add(this.book).subscribe({
        next: (saved) => { this.msg = 'Added successfully'; this.router.navigate(['/books', saved.id]); },
        error: e => this.err = e?.error?.message || 'Add failed'
      });
    }
  }

  cancel() { this.router.navigate(['/books']); }
}
