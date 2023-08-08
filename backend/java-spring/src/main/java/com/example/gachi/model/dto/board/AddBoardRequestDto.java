package com.example.gachi.model.dto.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.enums.Kind;
import lombok.*;
import org.apache.ibatis.javassist.NotFoundException;

@Data
@AllArgsConstructor
@Builder
public class AddBoardRequestDto {

    private Kind kind;
    private String title;
    private String content;
    private String email;


    public Board toEntity(Long id) throws NotFoundException{

        return Board.builder()
                .kind(kind)
                .title(title)
                .content(content)
                .build();
    }

}



