package com.example.OnlineBookStore.repository;

import com.example.OnlineBookStore.entity.Cart;
import com.example.OnlineBookStore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndBook_Id(Cart cart, Long bookId);
    void deleteByCartAndBook_Id(Cart cart, Long bookId);
}
