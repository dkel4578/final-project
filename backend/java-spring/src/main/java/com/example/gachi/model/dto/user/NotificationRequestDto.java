package com.example.gachi.model.dto.user;

import com.example.gachi.model.User;
import com.example.gachi.model.enums.NotificationType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class NotificationRequestDto {

    private final String content;
    private final String url;
    private final NotificationType notificationType;
    private final Boolean isRead;
    private final User receiver;

    public NotificationRequestDto(String content, String url, NotificationType notificationType, Boolean isRead, User receiver) {
        this.content = content;
        this.url = url;
        this.notificationType = notificationType;
        this.isRead = isRead;
        this.receiver = receiver;
    }
}
