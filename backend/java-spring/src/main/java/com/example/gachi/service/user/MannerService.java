package com.example.gachi.service.user;

import com.example.gachi.model.Manner;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.MannerScoreDto;
import com.example.gachi.repository.MannerRepository;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MannerService {
    private final MannerRepository mannerRepository;
    private final UserRepository userRepository;

    public double mannerAvgScore(String loginId){
        return mannerRepository.getAvgScoreByLoginId(loginId);
    }

    public void addMannerScore(MannerScoreDto mannerScoreDto){
        User user = userRepository.findById(mannerScoreDto.getUserId()).orElseThrow(() ->
        new IllegalArgumentException("존재하지 않는 유저 아이디"));
        Manner manner = mannerScoreDto.toMannerEntity(user);
        manner = mannerRepository.save(manner);
    }

}
