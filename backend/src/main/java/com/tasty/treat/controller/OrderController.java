package com.tasty.treat.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasty.treat.model.Cart;
import com.tasty.treat.model.CartItem;
import com.tasty.treat.model.Order;
import com.tasty.treat.model.OrderItem;
import com.tasty.treat.model.User;
import com.tasty.treat.repository.CartRepo;
import com.tasty.treat.repository.OrderRepo;
import com.tasty.treat.repository.UserRepo;
import com.tasty.treat.request.OrderRequest;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CartRepo cartRepo;

    @PostMapping("/{userId}/checkout")
    public ResponseEntity<?> checkoutOrder(@PathVariable Long userId, @RequestBody OrderRequest request) {
        try {
            User user = userRepo.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.status(404).body("{\"message\": \"User not found\"}");
            }

            Order order = new Order();
            order.setUser(user);
            order.setShippingName(request.getName());
            order.setShippingEmail(request.getEmail());
            order.setShippingPhone(request.getPhone());
            order.setShippingCountry(request.getCountry());
            order.setShippingCity(request.getCity());
            order.setShippingPostalCode(request.getPostalCode());
            order.setTotalAmount(request.getTotalAmount());
            order.setOrderDate(LocalDateTime.now());

            if (request.getItems() != null) {
                for (CartItem cartItem : request.getItems()) {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setProductId(cartItem.getProductId());
                    orderItem.setTitle(cartItem.getTitle());
                    orderItem.setImage01(cartItem.getImage01());
                    orderItem.setPrice(cartItem.getPrice());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setTotalPrice(cartItem.getTotalPrice());
                    order.getItems().add(orderItem);
                }
            }

            // Save order
            orderRepo.save(order);

            // Clear the cart
            Cart cart = cartRepo.findByUser(user);
            if (cart != null) {
                cart.getItems().clear();
                cart.setUpdatedAt(LocalDateTime.now());
                cartRepo.save(cart);
            }

            return ResponseEntity.ok().body("{\"message\": \"Order placed successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Checkout failed: " + e.getMessage() + "\"}");
        }
    }
}
