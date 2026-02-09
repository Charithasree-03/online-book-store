package com.example.OnlineBookStore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Table(name = "cart_items",
        uniqueConstraints = @UniqueConstraint(columnNames = {"cart_id", "book_id"}))
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    @JsonIgnore
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Min(1)
    @Column(nullable = false)
    private Integer quantity;

    // keep price snapshot when added
    @Column(nullable = false)
    private Double unitPrice;

    @Column(nullable = false)
    private Double subTotal;

    @PrePersist
    @PreUpdate
    void calc() {
        if (unitPrice == null && book != null) unitPrice = book.getPrice();
        if (quantity == null) quantity = 1;
        subTotal = unitPrice * quantity;
    }
}
