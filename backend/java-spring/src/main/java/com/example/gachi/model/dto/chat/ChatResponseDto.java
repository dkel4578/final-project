package com.example.gachi.model.dto.chat;

import com.example.gachi.model.ChatMessage;
import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@JsonIgnoreProperties({"user", "chatRoom"})
public class ChatResponseDto {
    private Long id;
//    private LocalDateTime createAt;
    private String message;
    private ChatRoom chatRoom;
    private Long roomId;
    private User user;
    private String nickname;
    private Long userId;

    public static ChatResponseDto of(ChatMessage chatMessage){
        return ChatResponseDto.builder()
                .id(chatMessage.getId())
                .message(chatMessage.getMessage())
                .nickname(chatMessage.getUser().getNickname())
                .roomId(chatMessage.getChatRoom().getId())
                .userId(chatMessage.getUser().getId())
                .build();

    }
}
