package com.example.gachi.repository;

import com.example.gachi.model.Manner;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MannerRepository extends JpaRepository<Manner, Long> {

    @Query("SELECT AVG(m.score) FROM Manner m JOIN m.user u WHERE u.id = :id")
    Double getAvgScoreById(@Param("id") Long id);
}
