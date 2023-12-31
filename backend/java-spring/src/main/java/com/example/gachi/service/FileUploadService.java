package com.example.gachi.service;

import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.dto.user.ProfileImgResponseDto;
import com.example.gachi.repository.ProfileImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileUploadService {
    private final ProfileImgRepository profileImgRepository;

    public ProfileImgResponseDto profileImgUpload(ProfileImg profileImg){
        profileImg = profileImgRepository.save(profileImg);
        return ProfileImgResponseDto.of(profileImg);
    }

}
