package com.example.gachi.config.jwt;

import com.example.gachi.model.dto.user.JwtTokenDto;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

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
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분의 유효기간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 1000L;
    private String jwtSecretKey;
    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        this.jwtSecretKey = secretKey;
    }

    public JwtTokenDto generateTokenDto(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        Date expireDate = getTokenExpirationTime();
        String name = authentication.getName();

        String accessToken = Jwts.builder()
                .setSubject(name)
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();

        return JwtTokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(expireDate.getTime())
                .build();
    }

    private Date getTokenExpirationTime() {
        long now = (new Date()).getTime();
        return new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
    }

    private Date getRefreshTokenExpirationTime(){
        long now = (new Date()).getTime();
        return new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
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
}



