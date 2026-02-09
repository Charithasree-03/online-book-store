import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { BookDetailComponent } from './pages/books/book-detail/book-detail.component';
import { BookFormComponent } from './pages/books/book-form/book-form.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookDetailComponent },

  { path: 'admin/books/new', component: BookFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/books/:id/edit', component: BookFormComponent, canActivate: [authGuard, adminGuard] },

  { path: 'cart', component: CartComponent },

  { path: '**', redirectTo: 'books' }
];
