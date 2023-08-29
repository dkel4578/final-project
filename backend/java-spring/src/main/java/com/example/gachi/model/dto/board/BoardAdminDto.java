package com.example.gachi.model.dto.board;


import com.example.gachi.model.Board;
import com.example.gachi.model.enums.Kind;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class BoardAdminDto {
    private Long id;
    private String title;
    private String content;
    private String kind;
    private Kind boardKind;
    private int cnt;
    private LocalDateTime createAt;
    private String delYn;
    private Long userId;
    private String userName;
    private String userNickName;


    public BoardAdminDto(Board board)

    {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.kind = board.getKind().getValue();
        this.boardKind = board.getKind();
        this.cnt = board.getCnt();
        this.createAt = board.getCreateAt();
        this.delYn = board.getDelYn();
        this.userId = board.getUser().getId();
        this.userName = board.getUser().getName();
        this.userNickName = board.getUser().getNickname();
    }
}