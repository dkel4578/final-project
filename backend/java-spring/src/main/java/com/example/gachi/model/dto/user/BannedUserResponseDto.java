package com.example.gachi.model.dto.user;

import com.example.gachi.model.BanList;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BannedUserResponseDto {
    private Long id;
    private String loginId;
    private String name;
    private String bannedYn;
    private BanReason banReason;
    private LocalDateTime banStartAt;
    private LocalDateTime banEndAt;

    public static BannedUserResponseDto of(User user, BanList banList) {
        // Member member 의 요소 중 BannedUserResponseDto 에 있는 것들을 가져 오겠다.
        // BanList banList 의 요소 중 BannedUserResponseDto 에 있는 것들을 가져 오겠다.
        return BannedUserResponseDto.builder()
                .id(banList.getId())
                .loginId(user.getLoginId())
                .name(user.getName())
                .bannedYn(user.getBannedYn())
                .banReason(banList.getBanReason())
                .banStartAt(banList.getBanStartAt())
                .banEndAt(banList.getBanEndAt())
                .build();
    }
}
