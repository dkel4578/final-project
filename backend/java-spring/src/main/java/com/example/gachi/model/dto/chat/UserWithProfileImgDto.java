package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
//@JsonIgnoreProperties({"user", "profileImg"})
public class UserWithProfileImgDto {
    private final Long userId;
    private final String imgSrc;
    private final String nickname;

    public UserWithProfileImgDto(Long userId, String imgSrc, String nickname) {
        this.userId = userId;
        this.imgSrc = imgSrc;
        this.nickname = nickname;
    }
}
