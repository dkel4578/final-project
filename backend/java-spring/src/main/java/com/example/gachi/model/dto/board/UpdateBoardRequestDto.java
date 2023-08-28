package com.example.gachi.model.dto.board;

import lombok.Data;

@Data
public class UpdateBoardRequestDto {
    private String title;
    private String content;

    public UpdateBoardRequestDto(
            String title,
            String content
            ){
            this.title = title;
            this.content = content;
    }
}
