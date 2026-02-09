package com.example.OnlineBookStore.service;

import com.example.OnlineBookStore.entity.*;
import com.example.OnlineBookStore.repository.BookRepository;
import com.example.OnlineBookStore.repository.CartItemRepository;
import com.example.OnlineBookStore.repository.CartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepo;
    private final CartItemRepository itemRepo;
    private final BookRepository bookRepo;

    public Cart getOrCreateCart(User user) {
        return cartRepo.findByUser(user).orElseGet(() -> cartRepo.save(
                Cart.builder().user(user).status(CartStatus.ACTIVE).build()
        ));
    }

    public Cart getMyCart(User user) {
        return getOrCreateCart(user);
    }

    @Transactional
    public Cart addToCart(User user, Long bookId, Integer qty) {
        if (qty == null || qty < 1) qty = 1;

        Cart cart = getOrCreateCart(user);
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found: " + bookId));

        if (book.getStock() == null || book.getStock() < qty) {
            throw new RuntimeException("Not enough stock");
        }
        if (Boolean.FALSE.equals(book.getAvailable())) {
            throw new RuntimeException("Book not available");
        }

        CartItem item = itemRepo.findByCartAndBook_Id(cart, bookId).orElse(null);
        if (item == null) {
            item = CartItem.builder()
                    .cart(cart)
                    .book(book)
                    .quantity(qty)
                    .unitPrice(book.getPrice())
                    .build();
            cart.getItems().add(item);
        } else {
            int newQty = item.getQuantity() + qty;
            if (book.getStock() < newQty) throw new RuntimeException("Not enough stock");
            item.setQuantity(newQty);
        }

        // totals auto-calculated in CartItem calc()
        cartRepo.save(cart);
        return cart;
    }

    @Transactional
    public Cart updateQuantity(User user, Long bookId, Integer qty) {
        if (qty == null || qty < 1) throw new RuntimeException("Quantity must be >= 1");

        Cart cart = getOrCreateCart(user);
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found: " + bookId));

        if (book.getStock() < qty) throw new RuntimeException("Not enough stock");

        CartItem item = itemRepo.findByCartAndBook_Id(cart, bookId)
                .orElseThrow(() -> new RuntimeException("Item not in cart"));

        item.setQuantity(qty);
        cartRepo.save(cart);
        return cart;
    }

    @Transactional
    public Cart removeItem(User user, Long bookId) {
        Cart cart = getOrCreateCart(user);
        itemRepo.deleteByCartAndBook_Id(cart, bookId);
        cart.getItems().removeIf(i -> i.getBook().getId().equals(bookId));
        return cartRepo.save(cart);
    }

    @Transactional
    public Cart clear(User user) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().clear();
        return cartRepo.save(cart);
    }
}
