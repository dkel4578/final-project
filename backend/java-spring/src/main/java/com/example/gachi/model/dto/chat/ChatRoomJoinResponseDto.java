package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ChatRoomJoin;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomJoinResponseDto {
    private Long id;
    private Long userId;
    private Long roomId;

    public static ChatRoomJoinResponseDto of(ChatRoomJoin chatRoomJoin){
        return ChatRoomJoinResponseDto.builder()
                .id(chatRoomJoin.getId())
                .userId(chatRoomJoin.getUser().getId())
                .roomId(chatRoomJoin.getChatRoom().getId())
                .build();
    }
}
