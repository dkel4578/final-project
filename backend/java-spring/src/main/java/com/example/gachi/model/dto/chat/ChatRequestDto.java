package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ChatMessage;
import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRequestDto {

    private String message;
    private ChatRoom chatRoom;
    private Long roomId;
    private User user;
    private Long userId;

    public ChatMessage signupMessage(User user, ChatRoom chatRoom){
        return ChatMessage.builder()
                .message(message)
                .user(user)
                .chatRoom(chatRoom)
                .build();
    }

    public ChatRequestDto(String message, ChatRoom chatRoom, User user) {
        this.message = message;
        this.chatRoom = chatRoom;
        this.user = user;
    }
}
