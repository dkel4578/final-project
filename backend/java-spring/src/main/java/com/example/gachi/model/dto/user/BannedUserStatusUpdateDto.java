package com.example.gachi.model.dto.user;

import lombok.*;

@Getter
public class BannedUserStatusUpdateDto {
    private final String bannedYn;
    @Builder
    BannedUserStatusUpdateDto(String bannedYn){
        this.bannedYn = bannedYn;
    }
}
