package com.example.gachi.config;

import lombok.AllArgsConstructor;
import com.example.gachi.config.jwt.JwtAccessDeniedHandler;
import com.example.gachi.config.jwt.JwtAuthenticationEntryPoint;
import com.example.gachi.config.jwt.JwtSecurityConfig;
import com.example.gachi.config.jwt.JwtTokenProvider;
import com.example.gachi.config.oauth.OAuth2CustomAuthenticationSuccessHandler;
import com.example.gachi.config.oauth.OAuth2CustomUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.Arrays;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Component
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final OAuth2CustomUserService oAuth2CustomUserService;

    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring()
                .requestMatchers(toH2Console())
                ;
    }
    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http
            , HandlerMappingIntrospector introspector
    ) throws Exception {
        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);

        http
                .cors()
                .and()
                .httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .authorizeHttpRequests()
                .requestMatchers(mvcMatcherBuilder.pattern("/api/**")).permitAll()
                .requestMatchers(mvcMatcherBuilder.pattern("/oauth2/**")).permitAll()
                .requestMatchers(mvcMatcherBuilder.pattern("/upload/**")).permitAll()
//                .requestMatchers(mvcMatcherBuilder.pattern("/email-login","user/email-login","/EmailTemplate")).permitAll()
                .requestMatchers(mvcMatcherBuilder.pattern("\"/\", \"/css/**\", \"/images/**\", \"/js/**\", \"/h2-console/**\", \"/api/**\"")).permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
//                .failureHandler()
                .successHandler(customAuth2SuccessHandler())
                .userInfoEndpoint() // OAuth 2.0 Provider로부터 사용자 정보를 가져오는 엔드포인트를 지정하는 메서드
                .userService(oAuth2CustomUserService)   // OAuth 2.0 인증이 처리되는데 사용될 사용자 서비스를 지정하는 메서드
        ;
        http.apply(new JwtSecurityConfig(jwtTokenProvider));

        return http.build();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


//    @Bean
//    public WebSecurityCustomizer configure() throws Exception {
//        return (web) -> web.ignoring()
//                .requestMatchers("/static/**");
////                .requestMatchers(toH2Console())
////                .requestMatchers("/static/**","/**");
//    }

    @Bean
    public OAuth2CustomAuthenticationSuccessHandler customAuth2SuccessHandler() {
        return new OAuth2CustomAuthenticationSuccessHandler(oAuth2CustomUserService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
