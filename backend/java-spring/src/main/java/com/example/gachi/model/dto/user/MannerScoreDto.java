package com.example.gachi.model.dto.user;

import com.example.gachi.model.Manner;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MannerScoreDto {
    private long id;
    private long score;
    private Long userId;
    private Review review;

    public Manner toMannerEntity(User user) {
        return Manner.builder()
                .score(score)
                .user(user)
                .review(review)
                .build();
    }

    public static MannerScoreDto fromMannerEntity (Manner manner) {
        return MannerScoreDto.builder()
                .id(manner.getId())
                .score(manner.getScore())
                .userId(manner.getUser().getId()) // User 엔티티의 userId를 설정
                .review(manner.getReview()) // Review 열거형(Enum) 설정
                .build();
    }
}
