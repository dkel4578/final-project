package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomUserDto {
    private User user;
    private ChatRoom chatRoom;
    private Long chatRoomId;
    private String bannedYn;

    public static ChatRoomUserDto of(ChatRoomJoin chatRoomJoin){
        return ChatRoomUserDto.builder()
                .user(chatRoomJoin.getUser())
                .chatRoom(chatRoomJoin.getChatRoom())
                .chatRoomId(chatRoomJoin.getChatRoom().getId())
                .bannedYn(chatRoomJoin.getBannedYn())
                .build();
    }

}
