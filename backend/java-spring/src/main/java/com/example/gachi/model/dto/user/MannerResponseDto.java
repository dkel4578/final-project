package com.example.gachi.model.dto.user;

import com.example.gachi.model.Manner;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.Review;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MannerResponseDto {

    private Long id;
    private User user;
    private Long userId;
    private User reviewer;
    private Long reviewerId;
    private Review Review;
    private long score;

    public static MannerResponseDto of(Manner manner){
        return MannerResponseDto.builder()
                .id(manner.getId())
                .user(manner.getUser())
                .userId(manner.getUser().getId())
                .reviewer(manner.getReviewer())
                .reviewerId(manner.getReviewer().getId())
                .score(manner.getScore())
                .build();
    }
}
