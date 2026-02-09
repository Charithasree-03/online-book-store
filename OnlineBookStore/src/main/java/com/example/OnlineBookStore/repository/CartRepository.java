package com.example.OnlineBookStore.repository;

import com.example.OnlineBookStore.entity.Cart;
import com.example.OnlineBookStore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
