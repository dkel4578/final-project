package com.example.gachi.repository;

import com.example.gachi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByLoginId(String loginId);
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);
    boolean existsByLoginIdAndPassword(String loginId, String password);
    Optional<User> findByLoginId(String loginId);
    Optional<User> findByLoginIdAndProvider(String loginId, String provider);

    Optional<User> findLoginIdByEmail(String email);

    List<User> findByStatus(String status);

    List<User> findByAuthority(String authority);

    List<User> findByBannedYn(String bannedYn);

    String findPasswordByLoginId(String loginId);

    Long findIdByLoginId(String loginId);

    User findAllById(Long userId);

//    List<User> findBy(String bannedYn);
}
