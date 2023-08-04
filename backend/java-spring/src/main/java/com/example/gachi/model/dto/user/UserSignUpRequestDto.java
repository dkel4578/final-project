package com.example.gachi.model.dto.user;

import com.example.gachi.model.User;
import com.example.gachi.model.enums.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSignUpRequestDto {
    private String loginId;
    private String name;
    private String password;
    private String phone;
    private String email;
    private String gender;
    private String nickname;
    private String profileMessage;
    private LocalDate birth;


    //회원가입
    public User signupUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .loginId(loginId)
                .name(name)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .phone(phone)
                .email(email)
                .gender(gender)
                .profileMessage(profileMessage)
                .authority(Authority.USER)
                .birth(birth)
                .build();
    }
}
