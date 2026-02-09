package com.example.OnlineBookStore.repository;

import com.example.OnlineBookStore.entity.Role;
import com.example.OnlineBookStore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByRole(Role role);
}
