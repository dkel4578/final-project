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
    private String email;
    private String provider;
    private String nickname;

    public User loginUser() {
        return User.builder()
//                .name(name)
                .email(email)
                .provider(Provider.valueOf(provider))
                .nickname(nickname)
                .authority(Authority.USER)
                .build();
    }

    public User loginUser(JwtTokenDto jwtTokenDto) {
        return User.builder()
//                .name(name)
                .email(email)
                .provider(Provider.valueOf(provider))
                .nickname(nickname)
                .accessToken(jwtTokenDto.getAccessToken())
                .accessTokenExpireIn(jwtTokenDto.getTokenExpiresIn())
                .authority(Authority.USER)
                .build();
    }
}
