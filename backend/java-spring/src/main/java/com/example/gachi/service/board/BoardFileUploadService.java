package com.example.gachi.service.board;

import com.example.gachi.model.BrdImg;
import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.dto.board.BrdImgResponseDto;
import com.example.gachi.model.dto.user.ProfileImgResponseDto;
import com.example.gachi.repository.BrdImgRepository;
import com.example.gachi.repository.ProfileImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardFileUploadService {
    private final BrdImgRepository brdImgRepository;

    public BrdImgResponseDto brdImgUpload(BrdImg brdImg){
        brdImg = brdImgRepository.save(brdImg);
        return BrdImgResponseDto.of(brdImg);
    }
}
