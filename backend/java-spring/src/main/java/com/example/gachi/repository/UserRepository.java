package com.example.gachi.repository;

import com.example.gachi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByLoginId(String loginId);
    boolean existsByNickname(String nickname);
    Optional<User> findByLoginId(String loginId);
    Optional<User> findByLoginIdAndProvider(String loginId, String provider);


}
