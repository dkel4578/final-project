package com.example.gachi.model.dto.user;

import com.example.gachi.model.Notification;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.NotificationType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationResponseDto {

    private Long id;
    private String content;
    private String url;
    private NotificationType notificationType;
    private Boolean isRead;
    private User receiver;


    public static NotificationResponseDto create(Notification notification){
        return NotificationResponseDto.builder()
                .id(notification.getId())
                .content(notification.getContent())
                .url(notification.getUrl())
                .notificationType(notification.getNotificationType())
                .isRead(notification.getIsRead())
                .receiver(notification.getReceiver())
                .build();
    }
}
