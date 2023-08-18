package com.example.gachi.service.user;

import com.example.gachi.model.Manner;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.MannerRequestDto;
import com.example.gachi.model.dto.user.MannerResponseDto;
import com.example.gachi.repository.MannerRepository;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MannerService {
    private final MannerRepository mannerRepository;
    private final UserRepository userRepository;

    public double mannerAvgScore(long id){
        return mannerRepository.getAvgScoreById(id);
    }

    public MannerResponseDto addMannerScore(MannerRequestDto mannerRequestDto){
        User user = userRepository.findById(mannerRequestDto.getUserId()).orElseThrow(() ->
        new IllegalArgumentException("존재하지 않는 유저 아이디"));
        User reviewer = userRepository.findById(mannerRequestDto.getReviewerId()).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 유저 아이디"));
        Manner manner = mannerRequestDto.addMannerScore(user, reviewer);
        mannerRepository.save(manner);

        return MannerResponseDto.of(manner);
    }

}
