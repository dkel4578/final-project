package com.example.gachi.config.jwt;

import com.example.gachi.model.dto.user.JwtTokenDto;
import com.example.gachi.model.dto.user.RefreshTokenDto;
import com.example.gachi.model.enums.Authority;
import com.example.gachi.repository.RefreshTokenRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private RefreshTokenRepository refreshTokenRepository;
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 3000L; // 30분의 유효기간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 1000L;
    private final String jwtSecretKey;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        this.jwtSecretKey = secretKey;
    }

    //토큰 생성 by oauth2( ex 구글 ) member id 생성 기준
    public JwtTokenDto generateTokenDto(String id) {
        Date expireDate = getTokenExpirationTime();

        String accessToken = Jwts.builder()
                .setExpiration(expireDate)
                .setSubject(id)
                // 현재는 ROLE_USER 만 가져옴
                .claim(AUTHORITIES_KEY, Authority.USER.name())
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();

        return JwtTokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(expireDate.getTime())
                .build();
    }

    //Authentication 으로 토큰 생성
    public JwtTokenDto generateTokenDto(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        Date acceessTokenExpireDate = getTokenExpirationTime();
        String name = authentication.getName();

        String accessToken = Jwts.builder()
                .setSubject(name)
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(acceessTokenExpireDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();

        return JwtTokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(acceessTokenExpireDate.getTime())
                .build();
    }

    private Date getTokenExpirationTime() {
        long now = (new Date()).getTime();
        return new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
    }

    private Date getRefreshTokenExpirationTime() {
        long now = (new Date()).getTime();
        return new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
    }
    // Refresh Token 생성.
    public RefreshTokenDto createRefreshToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Date refreshTokenExpireDate = getRefreshTokenExpirationTime();
        String name = authentication.getName();

        String refreshToken = Jwts.builder()
                .setSubject(name)
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(refreshTokenExpireDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();

        return RefreshTokenDto.builder()
                .grantType(BEARER_TYPE)
                .refreshToken(refreshToken)
                .tokenExpiresIn(refreshTokenExpireDate.getTime())
                .build();

    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = null;
        try {
            claims = parseClaims(accessToken);
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        }

        if (Objects.isNull(claims)
                || Objects.isNull(claims.get(AUTHORITIES_KEY))
        ) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims parseClaims(String accessToken) {
        return Jwts.parser()
                .setSigningKey(jwtSecretKey)
                .parseClaimsJws(accessToken)
                .getBody();
    }


    // RefreshToken 존재유무 확인
    public boolean existsRefreshToken(String refreshToken) {
        return refreshTokenRepository.existsByRefreshToken(refreshToken);
    }

    // 토큰에서 회원 정보 추출
    public String getUserLoginId(String token) {
        return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token).getBody().getSubject();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
//        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

}