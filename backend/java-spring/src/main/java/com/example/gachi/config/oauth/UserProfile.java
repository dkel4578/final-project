package com.example.gachi.config.oauth;
import com.example.gachi.model.enums.Authority;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.JwtTokenDto;
import com.example.gachi.model.enums.Provider;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserProfile {
    //    private String name;
    private String loginId;
    private String provider;
    private String name;

    public User loginUser() {
        return User.builder()
//                .name(name)
                .loginId(loginId)
//                .provider(Provider.valueOf(provider))
                .provider(provider)
                .name(name)
                .authority(Authority.USER)
                .build();
    }

    public User loginUser(JwtTokenDto jwtTokenDto) {
        return User.builder()
//                .name(name)
                .email(loginId)
//                .provider(Provider.valueOf(provider))
                .provider(provider)
                .name(name)
                .accessToken(jwtTokenDto.getAccessToken())
                .accessTokenExpireIn(jwtTokenDto.getTokenExpiresIn())
                .authority(Authority.USER)
                .build();
    }
}
