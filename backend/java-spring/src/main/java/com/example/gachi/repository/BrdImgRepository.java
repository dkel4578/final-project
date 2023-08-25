package com.example.gachi.repository;

import com.example.gachi.model.BrdImg;
import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrdImgRepository extends JpaRepository<BrdImg, Long> {
    Optional<BrdImg> findByBoardId(Long boardId);
}
