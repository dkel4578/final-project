package com.example.gachi.model.dto.board;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateCommentRequestDto {
    private String content;

    @Builder
    public UpdateCommentRequestDto(
            String content
    ){
        this.content = content;
    }
}
