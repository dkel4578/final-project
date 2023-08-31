package com.example.gachi.controller.chat;

import com.example.gachi.model.dto.chat.ChatDto;
import com.example.gachi.model.dto.chat.ChatRequestDto;
import com.example.gachi.model.dto.chat.ChatResponseDto;
import com.example.gachi.service.chat.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.*;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatMessageController {
    private static final Set<String> SESSION_IDS = new HashSet<>();
//    private static final Map<String, Integer> sessions = new HashMap<>();
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
     

        ChatResponseDto chatResponseDto = chatMessageService.signupMessage(chatDto);
        ResponseEntity.ok(chatResponseDto);
        simpMessagingTemplate.convertAndSend("/sub/chat/room/" + chatDto.getRoomId(), chatDto);
    }

    @EventListener(SessionConnectEvent.class)
    public void onConnect(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
//        String userId = event.getMessage().getHeaders().get("nativeHeaders").toString().split("User=\\[")[1].split("]")[0];

        SESSION_IDS.add(sessionId);
//        sessions.put(sessionId, Integer.valueOf(userId));
        log.info("[connect] connections(set) : {}", SESSION_IDS.size());
//        System.out.println("[connect] connections(map) : " + sessions.size());
    }
    //유저 퇴장시 확인
    @EventListener(SessionDisconnectEvent.class)
    public void onDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();

        SESSION_IDS.remove(sessionId);
//        sessions.remove(sessionId);
        log.info("[disconnect] disconnections(set) : {}", SESSION_IDS.size());
//        System.out.println("[disconnect] disconnections(map) : " + sessions.size());
    }

    @GetMapping("/api/messageHistory")
    public ResponseEntity<List<ChatResponseDto>> messageList(@RequestParam Long roomId){
        List<ChatResponseDto> chatResponseDtos = chatMessageService.chatList(roomId);
        return ResponseEntity.ok(chatResponseDtos);
    }

}
