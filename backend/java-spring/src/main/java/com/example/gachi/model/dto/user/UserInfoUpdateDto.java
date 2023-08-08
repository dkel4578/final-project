package com.example.gachi.model.dto.user;

import com.example.gachi.model.User;
import lombok.*;

import java.time.LocalDate;

@Getter
public class UserInfoUpdateDto {
    private final String name;
    private final String phone;
    private final String email;
    private final String gender;
    private final String nickname;
    private final String profileMessage;
    private final LocalDate birth;
    @Builder
    public UserInfoUpdateDto(
            String name,
            String phone,
            String email,
            String gender,
            String nickname,
            String profileMessage,
            LocalDate birth){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.nickname = nickname;
        this.profileMessage = profileMessage;
        this.birth = birth;
    }
}
