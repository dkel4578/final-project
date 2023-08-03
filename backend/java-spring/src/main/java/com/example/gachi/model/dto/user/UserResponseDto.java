package com.example.gachi.model.dto.user;

import com.example.gachi.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private String loginId;
    private String name;
    private String nickname;
    private String phone;
    private String gender;
    private LocalDate birth;

    public static UserResponseDto of(User user) {
        // Member member 의 요소 중 UserResponseDto 에 있는 것들을 가져 오겠다.
        return UserResponseDto.builder()
                .loginId(user.getLoginId())
                .name(user.getName())
                .nickname(user.getNickname())
                .phone(user.getPhone())
                .gender(user.getGender())
                .build();
    }
}
