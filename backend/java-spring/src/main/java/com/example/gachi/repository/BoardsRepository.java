package com.example.gachi.repository;

import com.example.gachi.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardsRepository extends JpaRepository<Board, Long> {
    @Query(value="SELECT p FROM Board p WHERE p.kind=1 ORDER BY p.id DESC")
    Page<Board> findByIdLessThanOrderByIdDesc(Long lastBoardId, PageRequest pageRequest);

    Page<Board> findByIdLessThan(Long boardId, Pageable pageable);
}
