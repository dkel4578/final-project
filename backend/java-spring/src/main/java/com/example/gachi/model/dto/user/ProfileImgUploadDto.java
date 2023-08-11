package com.example.gachi.model.dto.user;

import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@Builder
public class ProfileImgUploadDto {

    private Long id;
    private User user;
    private Long userId;
    private String imgSrc;
    private String imgName;
    private String orgName;

    public ProfileImg toProfileImgEntity(User user){
        return ProfileImg.builder()
                .user(user)
                .imgSrc(imgSrc)
                .imgName(imgName)
                .orgName(orgName)
                .build();
    }

    public static ProfileImgUploadDto fromProfileImgEntity(ProfileImg profileImg){
        return ProfileImgUploadDto.builder()
                .imgSrc(profileImg.getImgSrc())
                .imgName(profileImg.getImgName())
                .orgName(profileImg.getOrgName())
                .userId(profileImg.getUser().getId())
                .build();
    }

}
