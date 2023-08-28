package com.example.gachi.model.dto.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.User;
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
    private User user;
    private Long userId;
    private String localAddress;

    //게시글 입력
    public Board toEntity(User user) throws NotFoundException{
        return Board.builder()
                .kind(kind)
                .title(title)
                .content(content)
                .user(user)
                .localAddress(localAddress)
                .build();
    }

}



