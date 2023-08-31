package com.example.gachi.repository;

import com.example.gachi.model.ViewBoard;
import com.example.gachi.model.enums.Kind;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ViewBoardRepository extends JpaRepository<ViewBoard, Long> {
    @Query(value = "SELECT p " +
            "FROM ViewBoard p " +
            "WHERE p.kind = :kindValue " +
            "AND p.delYn='N' " +
            "AND (:searchWord IS NULL OR p.title LIKE %:searchWord% OR p.content LIKE %:searchWord%) " +
            "ORDER BY p.createAt DESC ")
    Page<ViewBoard> findByKindAndTitleContainingOrderByCreateAtDesc(
            @Param("kindValue") Kind kindValue,
            @Param("searchWord") String searchWord,
            Pageable pageable
    );
    @Query(value = "SELECT p " +
            "FROM ViewBoard p " +
            "WHERE p.kind = :kindValue " +
            "AND p.delYn='N' " +
            "AND p.id < :lastBoardId " +
            "ORDER BY p.createAt DESC ")
    Page<ViewBoard> findByKindOrderByCreateAtDesc(
            @Param("lastBoardId") Long lastBoardId,
            @Param("kindValue") Kind kindValue,
            Pageable pageable
    );

    Page<ViewBoard> findByIdLessThan(Long boardId, Pageable pageable);

    default Page<ViewBoard> fetchBoardList(
            Kind kindValue,
            Long lastBoardId,
            String searchWord,
            Pageable pageable
    ) {
        if (searchWord != null && !searchWord.isEmpty()) {
            return findByKindAndTitleContainingOrderByCreateAtDesc(kindValue, searchWord, pageable);
        } else {
            return findByKindOrderByCreateAtDesc(lastBoardId, kindValue, pageable);
        }
    }
}
