package com.tasty.treat.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasty.treat.model.Cart;
import com.tasty.treat.model.CartItem;
import com.tasty.treat.model.User;
import com.tasty.treat.repository.CartRepo;
import com.tasty.treat.repository.UserRepo;
import com.tasty.treat.request.SyncCartRequest;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getCart(@PathVariable Long userId) {
        try {
            User user = userRepo.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.status(404).body("{\"message\": \"User not found\"}");
            }
            Cart cart = cartRepo.findByUser(user);
            if (cart == null) {
                cart = new Cart();
                cart.setUser(user);
                cart.setUpdatedAt(LocalDateTime.now());
                cart = cartRepo.save(cart);
            }
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Failed to retrieve cart: " + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/{userId}/sync")
    public ResponseEntity<?> syncCart(@PathVariable Long userId, @RequestBody SyncCartRequest request) {
        try {
            User user = userRepo.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.status(404).body("{\"message\": \"User not found\"}");
            }
            Cart cart = cartRepo.findByUser(user);
            if (cart == null) {
                cart = new Cart();
                cart.setUser(user);
            }

            // Clear existing items and add new ones
            cart.getItems().clear();
            
            if (request.getItems() != null) {
                for (CartItem item : request.getItems()) {
                    item.setCart(cart); // Link item to cart
                    cart.getItems().add(item);
                }
            }

            cart.setUpdatedAt(LocalDateTime.now());
            cartRepo.save(cart);

            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Failed to sync cart: " + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        try {
            User user = userRepo.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.status(404).body("{\"message\": \"User not found\"}");
            }
            Cart cart = cartRepo.findByUser(user);
            if (cart != null) {
                cart.getItems().clear();
                cart.setUpdatedAt(LocalDateTime.now());
                cartRepo.save(cart);
            }
            return ResponseEntity.ok().body("{\"message\": \"Cart cleared\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Failed to clear cart: " + e.getMessage() + "\"}");
        }
    }
}
