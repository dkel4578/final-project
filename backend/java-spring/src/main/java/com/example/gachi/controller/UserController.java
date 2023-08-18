package com.example.gachi.controller;

import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.*;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.user.UserService;
import com.example.gachi.util.BadRequestException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

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

    @GetMapping("/emailCheck")
    public ResponseEntity<?> checkEmailDuplication(@RequestParam String email ) throws BadRequestException {
        if(userService.emailCheck(email)){
            throw new BadRequestException("이미 사용 중인 이메일 입니다.");
        } else{
            return ResponseEntity.ok("사용 가능한 이메일 입니다.");
        }
    }
    //회원 가입
    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserSignUpRequestDto userSignUpRequestDto){
        System.out.println("dataname>>>>>>>>>>>>" + userSignUpRequestDto.getName());
        if(userSignUpRequestDto.getName() == null){
            throw new IllegalArgumentException("이름을 입력해주세요.");
        }
        UserResponseDto userResponseDto = userService.signup(userSignUpRequestDto);
        return ResponseEntity.ok(userResponseDto);

    }
    //로그인
    @PostMapping("/login")
    public ResponseEntity<JwtTokenDto> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return ResponseEntity.ok(userService.login(userLoginRequestDto));
    }
    //로그아웃
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletResponse response) {
//        // 쿠키 제거
//        Cookie cookie = new Cookie("token", null);
//        cookie.setMaxAge(0);
//        cookie.setPath("/");
//        response.addCookie(cookie);
//
//        return ResponseEntity.ok("로그아웃 완료");
//    }
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

    //비밀번호 변경
    @PutMapping("/update/password/{id}")
    public void updatePassword(@PathVariable Long id, @RequestBody UserPasswordUpdateDto userPasswordUpdateDto){
        userService.updatePassword(id, userPasswordUpdateDto);
    }

    //유저 정보 조회
    @GetMapping("/user/me")
    public ResponseEntity<UserResponseDto> getMyUserInfo() {
        System.out.println(">>>>>>>>>>>>>user/me");
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();

        return ResponseEntity.ok(myInfoBySecurity);
    }

    //유저 프로필 사진 조회
    @GetMapping("/profile/me")
    public ResponseEntity<ProfileImgResponseDto> getMyUserProfileImg(@RequestParam Long userId) {
        System.out.println(">>>>>>>>>>>>>>profile/me");
        ProfileImgResponseDto myUserProfileImg = userService.getMyUserProfileImg(userId);

        return ResponseEntity.ok(myUserProfileImg);
    }


    @GetMapping("/user/email")
    public void existEmail(String email , HttpServletResponse response){

        JSONObject jsonObject = new JSONObject();
        boolean emailCheck;
        Optional<User> userOptional = userRepository.findByEmail(email);

        if(userOptional.isPresent()) {
            System.out.println(userOptional);
            emailCheck = true;
        }else {
            System.out.println(userOptional);
            emailCheck = false;
        }
        jsonObject.put("emailCheck",emailCheck);

        try {
            response.getWriter().print(jsonObject);	//response.getWriter로 프린트 해주면 통신 성공
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/user/findLoginId")
    public void findLoginId(HttpServletResponse response, String email){
        JSONObject jsonObject = new JSONObject();
        String userLoginId = userService.getUserLoginIdByEmail(email);

        jsonObject.put("userId",userLoginId);

        try {
            response.getWriter().print(jsonObject);	//response.getWriter로 프린트 해주면 통신 성공
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    @GetMapping("/user/checkLoginIdByEmail")
    public void CheckLoginIdByEmail(HttpServletResponse response, String email,String loginId){
        JSONObject jsonObject = new JSONObject();
        Optional<User> userOptional = userRepository.findByLoginId(loginId);
        if(userOptional.isPresent()) {
            System.out.println(userOptional);
            User user = userOptional.get();
            if(user.getEmail().equals(email)){
                jsonObject.put("isEmailCorrect",true);
                jsonObject.put("isIdCorrect",true);
            }else {
                jsonObject.put("isEmailCorrect",false);
                jsonObject.put("isIdCorrect",true);
            }
        }else {
            jsonObject.put("isEmailCorrect",false);
            jsonObject.put("isIdCorrect",false);
        }
        try {
            response.getWriter().print(jsonObject);	//response.getWriter로 프린트 해주면 통신 성공
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
