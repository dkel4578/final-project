package com.example.gachi.model.dto.board;

import lombok.Data;

@Data
public class DeleteBoardRequestDto {
    private String delYn;

    public DeleteBoardRequestDto(String delYn){
            this.delYn = delYn;
    }
}
