package com.example.gachi.config.jwt;

import com.example.gachi.model.User;
import com.example.gachi.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String REFRESHTOKEN_HEADER = "refreshToken";
    public static final String BEARER_PREFIX = "Bearer ";

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        String accessToken = resolveAccessToken(request);
        String refreshToken = resolveRefreshToken(request);

        if (accessToken != null && jwtTokenProvider.validateToken(accessToken)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
            //재발급 후 다시 넣기
            //리프레쉬 토큰 검증
            boolean validateRefreshToken = jwtTokenProvider.validateToken(refreshToken);
            //리프레쉬 토큰 저장소 존재 유무 확인
            boolean isRefreshToken = jwtTokenProvider.existsRefreshToken(refreshToken);

            if(validateRefreshToken && isRefreshToken){
                String loginId = jwtTokenProvider.getUserLoginId(refreshToken);
                String password = userRepository.findPasswordByLoginId(loginId);
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                        =new UsernamePasswordAuthenticationToken(loginId, password);
                Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
                String newAccessToken = jwtTokenProvider.generateTokenDto(authentication).getAccessToken();

                Optional<User> userOptional = userRepository.findByLoginId(loginId);
                User user = userOptional.orElse(null);
                if(Objects.nonNull(user)){
                    user.setAccessToken(newAccessToken);
                    userRepository.save(user);
                }

            }
        }

        filterChain.doFilter(request, response);
    }
    public String resolveAccessToken(HttpServletRequest httpServletRequest) {
        String bearerToken = httpServletRequest.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String resolveRefreshToken(HttpServletRequest httpServletRequest) {
        String bearerToken = httpServletRequest.getHeader(REFRESHTOKEN_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }


}
