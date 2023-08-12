package com.example.gachi.service.user;

import com.example.gachi.model.BanList;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.BannedUserResponseDto;
import com.example.gachi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;


//    @Transactional
//    public List<BannedUserResponseDto> getBannedUserByBannedYn(String bannedYn){
//        List<User> banneds = userRepository.findByBannedYn(bannedYn);
//        List<BannedUserResponseDto> bannedDtoList = new ArrayList<>();
//        for (User user : banneds){
//
//            BannedUserResponseDto bannedUserResponseDto = BannedUserResponseDto.of(user, user.getBanList());
//            BanList banList = user.getBanList();
//            BannedUserResponseDto bannedUserResponseDto = BannedUserResponseDto.builder()
//                    .id(banList.getId())
//                    .loginId(user.getLoginId())
//                    .name(user.getName())
//                    .bannedYn(user.getBannedYn())
//                    .banReason(banList.getBanReason())
//                    .banStartAt(banList.getBanStartAt())
//                    .banEndAt(banList.getBanEndAt())
//                    .build();
//        }
//
//        return bannedList;




    @Transactional
    public List<BannedUserResponseDto> getBannedUserByBannedYn(String bannedYn) {
        List<User> banneds = userRepository.findByBannedYn(bannedYn);
        List<BannedUserResponseDto> bannedDtoList = new ArrayList<>();

        for (User user : banneds) {
            List<BanList> banLists = user.getBanLists(); // Assuming the getter is named "getBanLists()"

            for (BanList banList : banLists) {
                BannedUserResponseDto bannedUserResponseDto = BannedUserResponseDto.builder()
                        .id(banList.getId())
                        .loginId(user.getLoginId())
                        .name(user.getName())
                        .bannedYn(user.getBannedYn())
                        .banReason(banList.getBanReason())
                        .banStartAt(banList.getBanStartAt())
                        .banEndAt(banList.getBanEndAt())
                        .build();

                bannedDtoList.add(bannedUserResponseDto);
            }
        }

        return bannedDtoList;
    }
}


