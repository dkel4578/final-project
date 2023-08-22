package com.example.gachi.service.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.chat.ChatRoomResponseDto;
import com.example.gachi.model.dto.user.ProfileImgResponseDto;
import com.example.gachi.repository.ChatRoomJoinRepository;
import com.example.gachi.repository.ChatRoomRepository;
import com.example.gachi.repository.ProfileImgRepository;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJoinRepository chatRoomJoinRepository;
    private final UserRepository userRepository;
    private final ProfileImgRepository profileImgRepository;

    public Optional<ChatRoom> findById(Long id) {
        return chatRoomRepository.findById(id);
    }
    //채팅방 목록
    public List<ChatRoomResponseDto> findAll(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            // 사용자가 존재하지 않는 경우에 대한 처리
            return Collections.emptyList();
        }

        User user = userOptional.get();
        List<ChatRoomJoin> chatRoomJoins = chatRoomJoinRepository.findChatRoomJoinByUser(user);
        List<ChatRoom> chatRoomList = new ArrayList<>();

        for (ChatRoomJoin chatRoomJoin : chatRoomJoins) {
            chatRoomList.add(chatRoomJoin.getChatRoom());
        }

        return chatRoomList.stream()
                .map(ChatRoomResponseDto::of)
                .toList();
    }
    //채팅방 프로필 이미지
    public List<ProfileImgResponseDto> getRoomMasterProfileImg(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            // 사용자가 존재하지 않는 경우에 대한 처리
            return Collections.emptyList();
        }
        User user = userOptional.get();
        List<ChatRoomJoin> chatRoomJoins = chatRoomJoinRepository.findChatRoomJoinByUser(user);
        List<User> chatRoomUserList = new ArrayList<>();
        List<ProfileImg> profileImgList = new ArrayList<>();
        for (ChatRoomJoin chatRoomJoin : chatRoomJoins) {
            chatRoomUserList.add(chatRoomJoin.getChatRoom().getUser());
        }
        for (User users : chatRoomUserList) {
            ProfileImg profileImg = profileImgRepository.findFirstByUserIdOrderByCreateAtDesc(users.getId())
                    .orElse(null); // Optional이 비어있을 때 null 반환
            profileImgList.add(profileImg);
        }

        return profileImgList.stream()
                .map(ProfileImgResponseDto::of)
                .toList();

    }

}
