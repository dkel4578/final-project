package com.example.gachi.service.user;

import com.example.gachi.config.jwt.JwtTokenProvider;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.JwtTokenDto;
import com.example.gachi.model.dto.user.UserLoginRequestDto;
import com.example.gachi.model.dto.user.UserSignUpRequestDto;
import com.example.gachi.model.dto.user.UserResponseDto;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    //아이디 중복 검사
    public boolean loginIdCheck(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }
    //닉네임 중복 검사
    public boolean nicknameCheck(String nickname){
        return userRepository.existsByNickname(nickname);
    }

    //회원가입
    public UserResponseDto signup(UserSignUpRequestDto userSignUpRequestDto){

        User user = userSignUpRequestDto.signupUser(passwordEncoder);
        user = userRepository.save(user);
        return UserResponseDto.of(user);
    }

    //로그인
    public JwtTokenDto login(UserLoginRequestDto userLoginRequestDto){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                =new UsernamePasswordAuthenticationToken(userLoginRequestDto.getLoginId(), userLoginRequestDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);

        return jwtTokenProvider.generateTokenDto(authentication);
    }

}
