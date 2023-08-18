package com.example.gachi.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
