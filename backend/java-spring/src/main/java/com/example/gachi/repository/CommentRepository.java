package com.example.gachi.repository;

import com.example.gachi.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "SELECT p " +
            "FROM Comment p " +
            "WHERE p.board.id = :boardId " +
            "AND p.delYn = 'N' " +
            "ORDER BY p.createAt ASC ")
    List<Comment> findByBoardIdOrderByCreateAtDesc(@Param("boardId") Long boardId);

    default List<Comment> fetchCommentList(
            Long boardId
    ) {
        return findByBoardIdOrderByCreateAtDesc(boardId);
    }
}