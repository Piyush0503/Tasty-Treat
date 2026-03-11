package com.tasty.treat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasty.treat.model.Order;
import com.tasty.treat.model.User;
import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
