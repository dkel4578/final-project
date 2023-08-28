package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ChatMessage;
import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@JsonIgnoreProperties({"user"})
public class ChatRoomResponseDto {
    private Long id;
    private String name;
    private User user;
    private Long userId;
    private List<ChatMessage> chatMessageList;

    public static ChatRoomResponseDto of(ChatRoom chatRoom){
        return ChatRoomResponseDto.builder()
                .id(chatRoom.getId())
                .user(chatRoom.getUser())
                .userId(chatRoom.getUser().getId())
                .name(chatRoom.getName())
                .chatMessageList(chatRoom.getMessages())
                .build();
    }
}
