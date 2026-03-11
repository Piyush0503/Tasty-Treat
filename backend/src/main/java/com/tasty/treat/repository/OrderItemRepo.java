package com.tasty.treat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasty.treat.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
}
