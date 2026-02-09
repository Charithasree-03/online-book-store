import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role: Role = 'USER'; // ✅ default
  msg = '';
  err = '';

  roles: Role[] = ['USER', 'ADMIN'];

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.msg = '';
    this.err = '';
    this.auth.signup({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        this.msg = 'Signup successful. Please login.';
        setTimeout(() => this.router.navigate(['/login']), 600);
      },
      error: e => this.err = e?.error?.message || 'Signup failed'
    });
  }
}
