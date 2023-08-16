package com.example.gachi.model.dto.user;

import com.example.gachi.model.Manner;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.Review;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MannerRequestDto {
    private Long id;
    private User user;
    private Long userId;
    private User reviewer;
    private Long reviewerId;
    private Review review;
    private long score;
    @Builder
    public Manner addMannerScore(User user, User reviewer){
        return Manner.builder()
                .review(review)
                .user(user)
                .reviewer(reviewer)
                .score(score)
                .build();
    }
    public MannerRequestDto(Long userId, Long reviewerId, Review review, long score) {
        this.userId = userId;
        this.reviewerId = reviewerId;
        this.review = review;
        this.score = score;
    }
}
