package com.example.gachi.repository;

import com.example.gachi.model.Board;
import com.example.gachi.model.enums.Kind;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

    //게시글 가져오기 (검색 포함)
    @Repository
    public interface BoardsRepository extends JpaRepository<Board, Long> {

    @Query(value = "SELECT p " +
                    "FROM Board p " +
                    "WHERE p.kind = :kindValue " +
                    "AND p.delYn='N' " +
                    "AND (:searchWord IS NULL OR p.title LIKE %:searchWord% OR p.content LIKE %:searchWord%) " +
                    "ORDER BY p.createAt DESC ")
    Page<Board> findByKindAndTitleContainingOrderByCreateAtDesc(
            @Param("kindValue") Kind kindValue,
            @Param("searchWord") String searchWord,
            Pageable pageable
    );
    @Query(value = "SELECT p " +
                    "FROM Board p " +
                    "WHERE p.kind = :kindValue " +
                    "AND p.delYn='N' " +
                    "AND p.id < :lastBoardId " +
                    "ORDER BY p.createAt DESC ")
    Page<Board> findByKindOrderByCreateAtDesc(
            @Param("lastBoardId") Long lastBoardId,
            @Param("kindValue") Kind kindValue,
            Pageable pageable
    );
    Page<Board> findByIdLessThan(Long boardId, Pageable pageable);

        default Page<Board> fetchBoardList(
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
