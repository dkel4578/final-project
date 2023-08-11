package com.example.gachi.repository;

import com.example.gachi.model.Board;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardPageRepositoty extends PagingAndSortingRepository<Board, Long> {
    Optional<Board> findById(Long id);
}
