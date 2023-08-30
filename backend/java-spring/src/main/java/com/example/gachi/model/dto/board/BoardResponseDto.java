package com.example.gachi.model.dto.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.Comment;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.UserResponseDto;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardResponseDto {
    private Long id;
    private String title;
    private String content;
    private int cnt;
    private LocalDateTime creatAt;
    private int commentCount;
    private User user;
    private Long userId;
    private String localPlace;
    private String localAddress;
    private Double latitude;
    private Double longitude;
    private String nickname;


    public static BoardResponseDto of(Board board){
        return BoardResponseDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .cnt(board.getCnt())
                .creatAt(board.getCreateAt())
                .commentCount(board.getCommentCount())
                .userId(board.getUser().getId())
                .localPlace(board.getLocalPlace())
                .localAddress(board.getLocalAddress())
                .latitude(board.getLatitude())
                .longitude(board.getLongitude())
                .nickname(board.getUser().getNickname())
                .build();
    }
}
