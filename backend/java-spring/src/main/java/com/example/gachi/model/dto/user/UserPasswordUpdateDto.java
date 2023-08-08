package com.example.gachi.model.dto.user;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
public class UserPasswordUpdateDto {
    private String password;

    @Builder
    public UserPasswordUpdateDto(String password){
         this.password = password;
    }
    public UserPasswordUpdateDto() {
        // 기본 생성자
    }
}
