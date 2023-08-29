package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import com.example.gachi.repository.ChatRoomRepository;
import com.example.gachi.repository.UserRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder

public class ChatRoomJoinRequestDto {
    private final ChatRoom chatRoom;
    private final User user;

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    public ChatRoomJoin signup(ChatRoom chatRoom, User user) {
        return ChatRoomJoin.builder()
                .chatRoom(chatRoom)
                .user(user)
                .build();
    }

}
