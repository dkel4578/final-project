package com.example.gachi.service.user;

import com.example.gachi.config.jwt.JwtTokenProvider;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.*;
import com.example.gachi.repository.UserRepository;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

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
    //이메일 중복 검사
    public boolean emailCheck(String email){
        return userRepository.existsByEmail(email);
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
        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(authentication);
        Optional<User> userOptional = userRepository.findByLoginId(userLoginRequestDto.getLoginId());
        User user = userOptional.orElse(null);
        if(Objects.nonNull(user)){
            user.setAccessToken(jwtTokenDto.getAccessToken());
            user.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());
            userRepository.save(user);
        }
        return jwtTokenDto;
    }
    //패스워드 일치 확인
    public boolean checkPassword(Long id, String checkPassword){
        User user = userRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
        String realPassword = user.getPassword();
        return passwordEncoder.matches(checkPassword, realPassword);
    }
    //유저 정보 업데이트
    @Transactional
    public void update(Long id, UserInfoUpdateDto userInfoUpdateDto){
        User user = userRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("해당 유저가 존재 하지 않습니다."));
        user.updateUser(userInfoUpdateDto.getName(),
                userInfoUpdateDto.getPhone(),
                userInfoUpdateDto.getEmail(),
                userInfoUpdateDto.getGender(),
                userInfoUpdateDto.getNickname(),
                userInfoUpdateDto.getProfileMessage(),
                userInfoUpdateDto.getBirth());
    }
    //유저 패스워드 변경
    @Transactional
    public void updatePassword(Long id, UserPasswordUpdateDto userPasswordUpdateDto){
        User user = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 유저가 존재 하지 않습니다."));
        String password = passwordEncoder.encode(userPasswordUpdateDto.getPassword());
        user.updatePassword(password);
    }
    //유저 정보 조회
    public UserResponseDto getMyInfoBySecurity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();

        Optional<UserResponseDto> userOptional
                = userRepository.findById(Long.parseLong(id)).map(UserResponseDto::of);
        return userOptional.orElse(null);
    }

//    유저 Login ID 조회
    public String getUserLoginIdByEmail(String email){
        Optional<User> user = userRepository.findLoginIdByEmail(email);
        System.out.println(user);
        String userLoginId = user.get().getLoginId();


        //        userLoginId = user
        return userLoginId;
    }


}
