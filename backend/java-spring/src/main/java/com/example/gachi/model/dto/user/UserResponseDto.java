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
    private Long id;
    private String loginId;
    private String name;
    private String phone;
    private String email;
    private String gender;
    private String nickname;
    private String profileMessage;
    private LocalDate birth;

    public static UserResponseDto of(User user) {
        // Member member 의 요소 중 UserResponseDto 에 있는 것들을 가져 오겠다.
        return UserResponseDto.builder()
                .loginId(user.getLoginId())
                .name(user.getName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .gender(user.getGender())
                .nickname(user.getNickname())
                .profileMessage(user.getProfileMessage())
                .birth(user.getBirth())
                .build();
    }
}
