package com.example.gachi.model.dto.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto {
    private Long id;
    private Long userId;
    private Long boardId;
    private Long parentId;
    private String content;
    private LocalDateTime creatAt;
    private String nickname;

    public static CommentResponseDto of(Comment comment){
        return CommentResponseDto.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .content(comment.getContent())
                .boardId(comment.getBoard().getId())
                .parentId(comment.getParentId())
                .creatAt(comment.getCreateAt())
                .nickname(comment.getUser().getNickname())
                .build();
    }
}
