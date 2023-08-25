package com.example.gachi.repository;

import com.example.gachi.model.BanList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface BanListRepository extends JpaRepository<BanList, Long> {
}
