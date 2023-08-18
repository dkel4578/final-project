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
public class UserDto {
    private Long id;
    private String loginId;
    private String name;
    private String phone;
    private String email;
    private String gender;
    private String status;
    private String nickname;
    private String profileMessage;
    private LocalDate birth;




    public UserDto(User user) {
        // Member member 의 요소 중 UserResponseDto 에 있는 것들을 가져 오겠다.

        this.id = user.getId();
        this.loginId = user.getLoginId();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.status = user.getStatus();
        this.gender = user.getGender();
        this.nickname = user.getNickname();
        this.profileMessage = user.getProfileMessage();
        this.birth = user.getBirth();
    }
}
