import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  cartCount$!: Observable<number>;   // declare first

  constructor(
    public token: TokenService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // initialize after dependency injection
    this.cartCount$ = this.cart.count$;

    if (this.token.isLoggedIn() && this.token.isUser()) {
      this.cart.refresh();
    }
  }

  logout() {
    this.token.logout();
    this.cart.reset();
    this.router.navigateByUrl('/login');
  }
}
