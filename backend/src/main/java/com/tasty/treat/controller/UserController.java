package com.tasty.treat.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasty.treat.model.User;
import com.tasty.treat.repository.UserRepo;
import com.tasty.treat.request.LoginRequest;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            if (userRepo.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(409)
                        .body("{\"message\": \"Email already registered\"}");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setCreatedAt(LocalDateTime.now());
            userRepo.save(user);
            return ResponseEntity.ok()
                    .body("{\"message\": \"Account created successfully!\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("{\"message\": \"Registration failed: " + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userRepo.findByEmail(loginRequest.getEmail());

            if (user == null) {
                return ResponseEntity.status(404)
                        .body("{\"message\": \"No account found with this email\"}");
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401)
                        .body("{\"message\": \"Incorrect password\"}");
            }

            return ResponseEntity.ok()
                    .body("{\"message\": \"Login successful\", \"username\": \"" +
                            user.getUsername() + "\", \"userId\": " + user.getUserId() + "}");

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("{\"message\": \"Login failed: " + e.getMessage() + "\"}");
        }
    }

}
