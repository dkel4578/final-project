package com.example.gachi.model.dto.user;

import com.example.gachi.model.User;
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
public class UserRequestDto {
    private String loginId;
    private String name;
    private String password;
    private String nickname;
    private String phone;
    private String gender;
    private LocalDate birth;

    //회원가입
    public User signupUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .loginId(loginId)
                .name(name)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .phone(phone)
                .gender(gender)
                .build();
    }
}
