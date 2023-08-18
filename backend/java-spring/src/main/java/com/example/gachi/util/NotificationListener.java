package com.example.gachi.util;

import com.example.gachi.model.dto.user.NotificationRequestDto;
import com.example.gachi.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class NotificationListener {

    private final NotificationService notificationService;

    @TransactionalEventListener
    @Async
    public void handleNotification(NotificationRequestDto notificationRequestDto){
        notificationService.send(notificationRequestDto.getReceiver(), notificationRequestDto.getNotificationType(),
                notificationRequestDto.getContent(), notificationRequestDto.getUrl());
    }
}
