package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ChatMessage;
import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatDto {
    private Long roomId;
    private Long userId;
    private String message;


    public ChatMessage signupMessage(User user, ChatRoom chatRoom, String chat){
        return ChatMessage.builder()
                .chatRoom(chatRoom)
                .user(user)
                .message(chat)
                .build();
    }

    public ChatDto(Long roomId, Long userId, String chat) {
        this.roomId = roomId;
        this.userId = userId;
        this.message = chat;
    }
}
