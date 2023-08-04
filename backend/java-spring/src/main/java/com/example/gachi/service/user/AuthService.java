package com.example.gachi.service.user;

import com.example.gachi.config.jwt.JwtTokenProvider;
import com.example.gachi.model.dto.user.JwtTokenDto;
import com.example.gachi.model.dto.user.UserLoginRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public JwtTokenDto login(UserLoginRequestDto requestDto){ // 1. request 를 받음
        //2. 미검증 authentication 생성
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(requestDto.getLoginId(), requestDto.getPassword());
        //3. AuthenticationManagerBuilder 에게 authenticationToken 전달
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        //4. UserDetailsService 에 전달 (AuthenticationManagerBuilder 에 존재)
        //  UserDetailsService 를 implements 를 받는 CustomUserDetailService 로 전달
        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(authentication);
//
//        Member member = memberRepository.findByEmail(requestDto.getEmail()).get();
//        member.setAccessToken(jwtTokenDto.getAccessToken());
//        memberRepository.save(member);

        return jwtTokenDto;

    }
}
