package com.example.gachi.repository;

import com.example.gachi.model.ProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfileImgRepository extends JpaRepository<ProfileImg, Long> {

    Optional<ProfileImg> findFirstByUserIdOrderByCreateAtDesc(Long id);


}
