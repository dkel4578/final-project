package com.example.gachi.service.user;

import com.example.gachi.model.dto.user.UserSignUpRequestDto;
import com.example.gachi.model.dto.user.UserResponseDto;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    //아이디 중복 검사
    public boolean loginIdCheck(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }
    //닉네임 중복 검사
    public boolean nickname(String nickname){
        return userRepository.existsByNickname(nickname);
    }
}
