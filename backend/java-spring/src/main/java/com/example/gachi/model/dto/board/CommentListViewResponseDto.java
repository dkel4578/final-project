package com.example.gachi.model.dto.board;

import com.example.gachi.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentListViewResponseDto {
    private Long userId;
    private Long boardId;
    private Long parentId;
    private String content;

    public static CommentListViewResponseDto of(Comment comment) {
        return CommentListViewResponseDto.builder()
                .content(comment.getContent())
                .userId(comment.getUser().getId())
                .boardId(comment.getBoard().getId())
                .parentId(comment.getParentId())
                .build();
    }
}
