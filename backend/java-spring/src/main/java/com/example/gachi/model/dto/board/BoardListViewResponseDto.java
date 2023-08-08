package com.example.gachi.model.dto.board;

import com.example.gachi.model.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardListViewResponseDto {
    private String title;
    private String content;

    public static BoardListViewResponseDto of(Board board) {
        return BoardListViewResponseDto.builder()
                .title(board.getTitle())
                .content(board.getContent())
                .build();
    }
}
