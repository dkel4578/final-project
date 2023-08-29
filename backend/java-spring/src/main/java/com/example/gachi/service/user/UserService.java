package com.example.gachi.service.user;

import com.example.gachi.config.jwt.JwtTokenProvider;
import com.example.gachi.model.BanList;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.Report.BanDto;
import com.example.gachi.model.dto.user.*;
import com.example.gachi.model.enums.ReportStatus;
import com.example.gachi.repository.BanListRepository;
import com.example.gachi.repository.ProfileImgRepository;
import com.example.gachi.repository.RefreshTokenRepository;
import com.example.gachi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final ProfileImgRepository profileImgRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final BanListRepository banListRepository;


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
        RefreshTokenDto refreshTokenDto = jwtTokenProvider.createRefreshToken(authentication);
        Optional<User> userOptional = userRepository.findByLoginId(userLoginRequestDto.getLoginId());
        User user = userOptional.orElse(null);
        if(Objects.nonNull(user)){
            System.out.println("refreshTokenDto >>>>>>>>>>>>> " + refreshTokenDto.getRefreshToken());
            user.setAccessToken(jwtTokenDto.getAccessToken());
            user.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());
            userRepository.save(user);

            refreshTokenRepository.save(refreshTokenDto);
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

    //유저 프로필 이미지 조회

    public ProfileImgResponseDto getMyUserProfileImg(Long userId){
        Optional<ProfileImgResponseDto> profileImgResponseDtoOptional
                = profileImgRepository.findFirstByUserIdOrderByCreateAtDesc(userId).map(ProfileImgResponseDto::of);
        return profileImgResponseDtoOptional.orElse(null);
    }

//    유저 Login ID 조회
    public String getUserLoginIdByEmail(String email){
        Optional<User> user = userRepository.findLoginIdByEmail(email);
        System.out.println(user);
        String userLoginId = user.get().getLoginId();

        //        userLoginId = user
        return userLoginId;
    }

    public User getUserById(Long uid){
        Optional<User> user = userRepository.findById(uid);

        return user.get();
    }


    //밴 리스트 존재 여부 확인
//    public boolean checkBanEnd(Long userId){
//
//        BanDto banDto = banListRepository.findByUserIdAndBanStatus(userId, ReportStatus.J);
//        Optional<User> user = userRepository.findById(userId);
//        if (banDto != null){
//            if(LocalDateTime.now().isAfter(banDto.getBanEndAt())){
//                user.get().setBannedYn("N");
//                banDto.setBanStatus(ReportStatus.G);
//                return true;
//            }else{
//                return false;
//            }
//        }else {
//            return false;
//        }
//    }
    // 밴 리스트 존재 여부 확인
    public boolean checkBanEnd(Long userId) {
        List<BanList> banList = banListRepository.findByUserIdAndBanStatus(userId, ReportStatus.J);

        Optional<User> user = userRepository.findById(userId);

        boolean isBanned = false;  // 유저가 밴 상태인지 여부

        for (BanList ban : banList) {
            BanDto banDto = new BanDto(ban);
            if (banDto.getBanStatus() == ReportStatus.J && LocalDateTime.now().isAfter(banDto.getBanEndAt())) {
                user.get().setBannedYn("N");
                ban.setBanStatus(ReportStatus.G);  // 밴 상태 변경
                isBanned = true;
                break;  // 만료된 밴을 찾았으면 루프 종료
            }
        }
        if (isBanned) {
            // 만료된 밴이 있을 경우 유저의 상태 업데이트
            userRepository.save(user.get());
        }

        return isBanned;
    }
}
