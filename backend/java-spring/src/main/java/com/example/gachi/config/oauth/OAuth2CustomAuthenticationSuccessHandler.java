package com.example.gachi.config.oauth;

import com.example.gachi.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
@RequiredArgsConstructor
@Component
public class OAuth2CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    public static final String REDIRECT_URI = "http://localhost:3000/230724_practice/ouath2login/callback";
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofMinutes(30);
    private final OAuth2CustomUserService oAuth2CustomUserService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String loginId = (String) oAuth2User.getAttributes().get("email");
        User user = oAuth2CustomUserService.getUserByLoginId(loginId);
        response.sendRedirect(UriComponentsBuilder.fromUriString(REDIRECT_URI)
                .queryParam("accessToken", user.getAccessToken())
                .queryParam("accessTokenExpireIn", user.getAccessTokenExpireIn())
                .queryParam("refreshToken", user.getRefreshToken())
                .queryParam("refreshTokenExpireIn", user.getRefreshTokenExpireIn())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());
    }
}
