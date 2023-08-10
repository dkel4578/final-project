package com.example.gachi.repository;

import com.example.gachi.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface BoardRepository extends JpaRepository<Board, Long> {
    Slice<Board> findSliceBy(final Pageable pageable);
    Page<Board> findPageBy(final Pageable pageable);
}
