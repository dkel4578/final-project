package com.example.gachi.controller;

import ch.qos.logback.core.model.Model;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.*;
import com.example.gachi.service.user.UserService;
import com.example.gachi.util.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    //패스워드 일치 확인
    @PostMapping("checkPwd")
    public ResponseEntity<?> checkPassword(@RequestBody FindPasswordDto findPasswordDto){
        if(userService.checkPassword(findPasswordDto.getId(), findPasswordDto.getPassword())){
            return ResponseEntity.ok("확인 완료");
        }else {
            // 비밀번호가 일치하지 않는 경우 로그인 실패 처리
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }
    }
    //유저 정보 업데이트
    @PutMapping("/update/{id}")
    public void update(@PathVariable Long id, @RequestBody UserInfoUpdateDto userInfoUpdateDto){
        userService.update(id, userInfoUpdateDto);
    }

    @PutMapping("/update/password/{id}")
    public void updatePassword(@PathVariable Long id, @RequestBody UserPasswordUpdateDto userPasswordUpdateDto){
        userService.updatePassword(id, userPasswordUpdateDto);
    }

    //유저 정보 조회
    @GetMapping("/user/me")
    public ResponseEntity<UserResponseDto> getMyMemberInfo() {
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();

        return ResponseEntity.ok(myInfoBySecurity);
    }

}
