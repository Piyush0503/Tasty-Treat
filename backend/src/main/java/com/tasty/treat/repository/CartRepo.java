package com.tasty.treat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasty.treat.model.Cart;
import com.tasty.treat.model.User;

public interface CartRepo extends JpaRepository<Cart, Long> {
    Cart findByUser(User user);
}
