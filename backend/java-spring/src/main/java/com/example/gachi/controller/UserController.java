package com.example.gachi.controller;

import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.*;
import com.example.gachi.repository.ProfileImgRepository;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.user.UserService;
import com.example.gachi.util.BadRequestException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = "Authorization")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final ProfileImgRepository profileImgRepository;
    private final PasswordEncoder passwordEncoder;

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
    public ResponseEntity<?> signup(@RequestBody UserSignUpRequestDto userSignUpRequestDto) throws UnsupportedEncodingException {
        System.out.println("data Birth >>>>>>>>>>>>" + userSignUpRequestDto.getBirth());
        System.out.println("data Phone >>>>>>>>>>>>" + userSignUpRequestDto.getPhone());
        String charset = "euc-kr";
        if(userSignUpRequestDto.getName().isEmpty()) {
            String errorMessage = "이름을 입력해주세요.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
        else if(userSignUpRequestDto.getBirth()==null){
            String errorMessage = "생년월일을 입력해주세요.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }  else if(userSignUpRequestDto.getPhone().isEmpty()){
            String errorMessage = "핸드폰 번호를 입력해주세요.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }else if(userSignUpRequestDto.getPhone().length()<10 || !userSignUpRequestDto.getPhone().startsWith("01")){
            String errorMessage = "전화번호의 형식이 올바르지 않습니다.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }else if(userSignUpRequestDto.getNickname().getBytes(charset).length > 16){
            String errorMessage = "닉네임은 8글자를 넘을 수 없습니다.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
        UserResponseDto userResponseDto = userService.signup(userSignUpRequestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        String loginId = userLoginRequestDto.getLoginId();
        User user = userRepository.findByLoginId(loginId).orElse(null);
        String password = userLoginRequestDto.getPassword();
        String realPassword = user != null ? user.getPassword() : null;
        if (user != null && user.getBannedYn().equals("Y")) {
            if(userService.checkBanEnd(user.getId())){
                return ResponseEntity.ok(userService.login(userLoginRequestDto));
            }
            String errorMessage = "정지당한 아이디입니다.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
        if(!userRepository.existsByLoginId(loginId) || !passwordEncoder.matches(password, realPassword)){
            String errorMessage = "존재하지 않는 사용자입니다.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
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
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UserInfoUpdateDto userInfoUpdateDto) throws UnsupportedEncodingException {
        String charset = "euc-kr";
        if(userInfoUpdateDto.getName().isEmpty()) {
            String errorMessage = "이름을 입력해주세요.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
        else if(userInfoUpdateDto.getBirth()==null){
            String errorMessage = "생년월일을 입력해주세요.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }  else if(userInfoUpdateDto.getPhone().isEmpty()){
            String errorMessage = "핸드폰 번호를 입력해주세요.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }else if(userInfoUpdateDto.getPhone().length()<10 || !userInfoUpdateDto.getPhone().startsWith("01")){
            String errorMessage = "전화번호의 형식이 올바르지 않습니다.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }else if(userInfoUpdateDto.getNickname().getBytes(charset).length > 12){
            String errorMessage = "닉네임은 6글자를 넘을 수 없습니다.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
        userService.update(id, userInfoUpdateDto);
        return ResponseEntity.ok(userInfoUpdateDto);
    }

    //비밀번호 변경
    @PutMapping("/update/password/{id}")
    public void updatePassword(@PathVariable Long id, @RequestBody UserPasswordUpdateDto userPasswordUpdateDto){
        userService.updatePassword(id, userPasswordUpdateDto);
    }

    //유저 정보 조회
    @GetMapping("/user/me")
    public ResponseEntity<UserResponseDto> getMyUserInfo() {

        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        System.out.println(">>>>>>>>>>>>>user/me"+myInfoBySecurity);
        return ResponseEntity.ok(myInfoBySecurity);
    }

    //유저 프로필 사진 조회
    @GetMapping(value = "/profile/me/{userId}")
    public ResponseEntity<?> getMyUserProfileImg(@PathVariable Long userId) {

        String imgName = profileImgRepository.findFirstByUserIdOrderByCreateAtDesc(userId).get().getImgName();
        String path = System.getProperty("user.dir");
        String path2 = "\\src\\main\\resources\\image\\profileImg\\"+imgName;


        File file = new File("");
        File file1 = new File(path+path2);
        File file2= new File(path + "\\src\\main\\resources\\image\\profileImg\\default-image.svg");
        if(file1.exists()){
            file = file1;
        } else{
            file = file2;
        }
        byte[] result = null;
        ResponseEntity<byte[]> entity = null;
        try{
            result = FileCopyUtils.copyToByteArray(file);

            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", Files.probeContentType(file.toPath()));

            entity = new ResponseEntity<>(result, header, HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
//        ProfileImgResponseDto myUserProfileImg = userService.getMyUserProfileImg(userId);
//        if(myUserProfileImg == null){
//            return ResponseEntity.ok(userService.getMyUserProfileImg(0L));
//        }
        return entity;
    }

//    @GetMapping("/profile/me")
//    public ResponseEntity<?> getMyUserProfileImg(@RequestParam Long userId) throws IOException {
//        System.out.println(">>>>>>>>>>>>>>profile/me");
//        ProfileImgResponseDto myUserProfileImg = userService.getMyUserProfileImg(userId);
//        if (myUserProfileImg == null) {
//            myUserProfileImg = userService.getMyUserProfileImg(0L);
//        }
//
//        if (myUserProfileImg != null && myUserProfileImg.getImgSrc() != null) {
//            String imgsrc = myUserProfileImg.getImgSrc();
////            String imgsrc = "D:/test1/test1.png";
//            ClassPathResource imgFile = new ClassPathResource(imgsrc);
//
//            if (imgFile.exists()) {
//                byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());
//                MediaType mediaType = MediaTypeFactory.getMediaType(imgFile).orElse(MediaType.APPLICATION_OCTET_STREAM);
//
//                HttpHeaders headers = new HttpHeaders();
//                headers.setContentType(mediaType);
//
//                return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }


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

    //정지 종료 여부 확인
    @PostMapping("checkBanned")
    public ResponseEntity<?> checkBanEnd(Long userId){
        if(userService.checkBanEnd(userId)){
            return ResponseEntity.ok("정지 해제 완료.");
        }else {
            // 비밀번호가 일치하지 않는 경우 로그인 실패 처리
            return ResponseEntity.badRequest().body("정지 중");
        }
    }

}
