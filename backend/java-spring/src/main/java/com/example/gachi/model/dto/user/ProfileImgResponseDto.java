package com.example.gachi.model.dto.user;

import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileImgResponseDto {
    private Long id;
    private String imgSrc;
    private String imgName;
    private String orgName;
    private User user;
    private Long userId;

    public static ProfileImgResponseDto of(ProfileImg profileImg){
        return ProfileImgResponseDto.builder()
                .id(profileImg.getId())
                .imgSrc(profileImg.getImgSrc())
                .orgName(profileImg.getOrgName())
                .imgName(profileImg.getImgName())
                .userId(profileImg.getUser().getId())
                .build();
    }
}
