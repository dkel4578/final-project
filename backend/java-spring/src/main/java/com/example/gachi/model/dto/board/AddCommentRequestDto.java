package com.example.gachi.model.dto.board;


import com.example.gachi.model.Comment;
import com.example.gachi.model.User;
import com.example.gachi.model.Board;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.ibatis.javassist.NotFoundException;

@Data
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"user"})

public class AddCommentRequestDto {
    private String content;
    private User user;
    private Long userId;
    private Long boardId;
    private Long parentId;

    //게시글 입력
    public Comment toEntity(Board board, User user) throws NotFoundException{
        return Comment.builder()
                .content(content)
                .board(board)
                .parentId(parentId)
                .user(user)
                .build();
    }

}



