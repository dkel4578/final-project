package com.example.gachi.model.dto.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.Kind;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.apache.ibatis.javassist.NotFoundException;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"user"})
public class AddBoardRequestDto {

    private Kind kind;
    private String title;
    private String content;
    private User user;
    private Long userId;
    private String localPlace;
    private String localAddress;
    private double latitude;
    private double longitude;


    //게시글 입력
    public Board toEntity(User user) throws NotFoundException{
        return Board.builder()
                .kind(kind)
                .title(title)
                .content(content)
                .user(user)
                .localPlace(localPlace)
                .localAddress(localAddress)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }

}



