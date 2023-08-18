package com.example.gachi.controller.chat;

import com.example.gachi.model.dto.chat.ChatDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatMessageController {
    private static final Set<String> SESSION_IDS = new HashSet<>();
    private static final Map<String, Integer> sessions = new HashMap<>();
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
//        Integer writerId = SESSION_IDS.get(accessor.getSessionId());
        Integer writerId = sessions.get(accessor.getSessionId());
        chatDto.setWriterId(writerId);
        System.out.println("chatDto: " + chatDto);

        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChannelId(), chatDto);
    }

    @EventListener(SessionConnectEvent.class)
    public void onConnect(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
//        String userId = event.getMessage().getHeaders().get("nativeHeaders").toString().split("User=\\[")[1].split("]")[0];

        SESSION_IDS.add(sessionId);
//        sessions.put(sessionId, Integer.valueOf(userId));
        log.info("[connect] connections(set) : {}", SESSION_IDS.size());
        System.out.println("[connect] connections(map) : " + sessions.size());
    }

    @EventListener(SessionDisconnectEvent.class)
    public void onDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();

        SESSION_IDS.remove(sessionId);
        sessions.remove(sessionId);
        log.info("[disconnect] connections(set) : {}", SESSION_IDS.size());
        System.out.println("[disconnect] connections(map) : " + sessions.size());
    }
}
