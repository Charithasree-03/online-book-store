package com.example.OnlineBookStore.controller;

import com.example.OnlineBookStore.entity.Cart;
import com.example.OnlineBookStore.entity.User;
import com.example.OnlineBookStore.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public Cart myCart(@AuthenticationPrincipal User user) {
        return cartService.getMyCart(user);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public Cart add(@AuthenticationPrincipal User user,
                    @RequestParam Long bookId,
                    @RequestParam(defaultValue = "1") Integer qty) {
        return cartService.addToCart(user, bookId, qty);
    }

    @PutMapping("/qty")
    @PreAuthorize("hasRole('USER')")
    public Cart updateQty(@AuthenticationPrincipal User user,
                          @RequestParam Long bookId,
                          @RequestParam Integer qty) {
        return cartService.updateQuantity(user, bookId, qty);
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('USER')")
    public Cart remove(@AuthenticationPrincipal User user,
                       @RequestParam Long bookId) {
        return cartService.removeItem(user, bookId);
    }

    @DeleteMapping("/clear")
    @PreAuthorize("hasRole('USER')")
    public Cart clear(@AuthenticationPrincipal User user) {
        return cartService.clear(user);
    }
}
