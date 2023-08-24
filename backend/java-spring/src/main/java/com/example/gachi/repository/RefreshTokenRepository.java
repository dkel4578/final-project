package com.example.gachi.repository;

import com.example.gachi.model.dto.user.RefreshTokenDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenDto, String> {
    boolean existsByRefreshToken(String refreshToken);
}
