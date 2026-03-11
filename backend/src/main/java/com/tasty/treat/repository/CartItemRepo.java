package com.tasty.treat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasty.treat.model.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {
}
