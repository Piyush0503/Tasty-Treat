package com.tasty.treat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasty.treat.model.User;

public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);

    boolean existsByEmail(String email);

}
