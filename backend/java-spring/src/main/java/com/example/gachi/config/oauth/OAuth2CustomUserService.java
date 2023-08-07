package com.example.gachi.config.oauth;


import com.example.gachi.config.jwt.JwtTokenProvider;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.JwtTokenDto;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OAuth2CustomUserService implements OAuth2UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth 서비스(kakao, google, naver)에서 가져온 유저 정보를 담고있음

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId(); // OAuth 서비스 이름(ex. kakao, naver, google)
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName(); // OAuth 로그인 시 키(pk)가 되는 값
        Map<String, Object> attributes = oAuth2User.getAttributes(); // OAuth 서비스의 유저 정보들

        UserProfile userProfile = OAuth2Attributes.extract(registrationId, attributes); // registrationId에 따라 유저 정보를 통해 공통된 UserProfile 객체로 만들어 줌
        userProfile.setProvider(registrationId);
        User user = saveOrUpdate(userProfile);

        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(user.getId().toString());
        saveOrUpdate(user, jwtTokenDto);

        Map<String, Object> customAttribute = customAttribute(attributes, userNameAttributeName, userProfile, registrationId);
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                customAttribute,
                userNameAttributeName);
    }

    private Map customAttribute(Map attributes, String userNameAttributeName, UserProfile userProfile, String registrationId) {
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put(userNameAttributeName, attributes.get(userNameAttributeName));
        customAttribute.put("provider", registrationId);
        customAttribute.put("name", userProfile.getNickname());
        customAttribute.put("loginId", userProfile.loginUser().getLoginId());
        return customAttribute;

    }

    private User saveOrUpdate(UserProfile userProfile) {
        User user = userRepository.findByLoginIdAndProvider(userProfile.getEmail(), userProfile.getProvider())
                .map(u -> u.update(
                        userProfile.getEmail())) // OAuth 서비스 사이트에서 유저 정보 변경이 있을 수 있기 때문에 우리 DB에도 update
                .orElse(userProfile.loginUser());

        return userRepository.save(user);
    }

    private User saveOrUpdate(User user, JwtTokenDto jwtTokenDto) {
        if (Objects.isNull(user.getId()))
            return null;

        user.setAccessToken(jwtTokenDto.getAccessToken());
        user.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());
        return userRepository.save(user);
    }

    private User saveOrUpdate(UserProfile userProfile, JwtTokenDto jwtTokenDto) {
        User member = userRepository.findByLoginIdAndProvider(userProfile.getEmail(), userProfile.getProvider())
                .map(u -> u.update(
                        jwtTokenDto.getAccessToken(),
                        jwtTokenDto.getTokenExpiresIn(),
                        userProfile.getEmail(),
                        jwtTokenDto.getRefreshToken(),
                        jwtTokenDto.getRefreshTokenExpiresIn()
                        )) // OAuth 서비스 사이트에서 유저 정보 변경이 있을 수 있기 때문에 우리 DB에도 update
                .orElse(userProfile.loginUser(jwtTokenDto));

        return userRepository.save(member);
    }

    public User getUserByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
    }

    public User getUserByLoginIdAndProvider(String loginId, String provider) {
        return userRepository.findByLoginIdAndProvider(loginId, provider)
                .orElseThrow(() -> new IllegalArgumentException("이메일 및 외부 oauth지원으로 검색시 없는 유저입니다."));
    }

}
