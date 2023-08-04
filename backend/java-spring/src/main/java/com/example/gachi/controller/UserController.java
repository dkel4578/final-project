package com.example.gachi.controller;

import com.example.gachi.service.user.UserService;
import com.example.gachi.util.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
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

    @GetMapping("/nicknameCheck")
    public ResponseEntity<?> checkNicknameDuplication(@RequestParam String nickname ) throws BadRequestException {
        if(userService.loginIdCheck(nickname)){
            throw new BadRequestException("이미 사용 중인 닉네임 입니다.");
        } else{
            return ResponseEntity.ok("사용 가능한 닉네임 입니다.");
        }
    }


}
