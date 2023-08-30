package com.example.gachi.model.dto.board;

import com.example.gachi.model.ViewBoard;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import net.jcip.annotations.Immutable;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Builder
public class ViewBoardResponseDto {
    @Id
    private Long id;
    private String title;
    private String content;
    private int cnt;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private int commentCount;
    private Long userId;
    private String localPlace;
    private String localAddress;
    private Double latitude;
    private Double longitude;
    private String nickname;


    public static ViewBoardResponseDto of(ViewBoard viewBoard){
        return ViewBoardResponseDto.builder()
                .id(viewBoard.getId())
                .title(viewBoard.getTitle())
                .content(viewBoard.getContent())
                .cnt(viewBoard.getCnt())
                .createAt(viewBoard.getCreateAt())
                .updateAt(viewBoard.getUpdateAt())
                .commentCount(viewBoard.getCommentCount())
                .userId(viewBoard.getUserId())
                .localPlace(viewBoard.getLocalPlace())
                .localAddress(viewBoard.getLocalAddress())
                .latitude(viewBoard.getLatitude())
                .longitude(viewBoard.getLongitude())
                .nickname(viewBoard.getNickname())
                .build();
    }
}
