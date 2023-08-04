package com.example.gachi.controller;

import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.JwtTokenDto;
import com.example.gachi.model.dto.user.UserLoginRequestDto;
import com.example.gachi.model.dto.user.UserResponseDto;
import com.example.gachi.model.dto.user.UserSignUpRequestDto;
import com.example.gachi.service.user.UserService;
import com.example.gachi.util.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    //아이디 중복 체크
    @GetMapping("/idCheck")
    public ResponseEntity<?> checkIdDuplication(@RequestParam String loginId ) throws BadRequestException {
        if(userService.loginIdCheck(loginId)){
            throw new BadRequestException("이미 사용 중인 아이디 입니다.");
        } else{
            return ResponseEntity.ok("사용 가능한 아이디 입니다.");
        }
    }
    //닉네임 중복 체크
    @GetMapping("/nicknameCheck")
    public ResponseEntity<?> checkNicknameDuplication(@RequestParam String nickname ) throws BadRequestException {
        if(userService.nicknameCheck(nickname)){
            throw new BadRequestException("이미 사용 중인 닉네임 입니다.");
        } else{
            return ResponseEntity.ok("사용 가능한 닉네임 입니다.");
        }
    }
    //회원 가입
    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserSignUpRequestDto userSignUpRequestDto){
        UserResponseDto userResponseDto = userService.signup(userSignUpRequestDto);
        return ResponseEntity.ok(userResponseDto);

    }
    //로그인
    @PostMapping("/login")
    public ResponseEntity<JwtTokenDto> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return ResponseEntity.ok(userService.login(userLoginRequestDto));
    }

}
