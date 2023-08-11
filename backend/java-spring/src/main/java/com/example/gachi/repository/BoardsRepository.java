package com.example.gachi.repository;

import com.example.gachi.model.Board;
import com.example.gachi.model.enums.Kind;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardsRepository extends JpaRepository<Board, Long> {
    @Query(value = "SELECT p FROM Board p WHERE p.kind = :kindValue AND p.id < :lastBoardId ORDER BY p.createAt DESC")
    Page<Board> findByKindOrderByCreateAtDesc(
            @Param("lastBoardId") Long lastBoardId,
            @Param("kindValue") Kind kindValue,
            Pageable pageable
    );

    Page<Board> findByIdLessThan(Long boardId, Pageable pageable);
}
