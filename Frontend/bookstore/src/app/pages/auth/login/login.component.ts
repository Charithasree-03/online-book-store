import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  err = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.err = '';
    this.auth.signin({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/books']),
      error: e => this.err = e?.error?.message || 'Login failed'
    });
  }
}
