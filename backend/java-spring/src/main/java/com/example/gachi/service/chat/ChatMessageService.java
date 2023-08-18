package com.example.gachi.service.chat;

import com.example.gachi.repository.ChatMessageRepository;
import com.example.gachi.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserService userService;
    private final ChatRoomService chatRoomService;

//    @Transactional
//    public void save(ChatMessageForm message) {
//        ChatMessage chatMessage = new ChatMessage(message.getMessage(), LocalDateTime.now(),chatRoomService.findById(message.getChatRoomId()).get()
//                ,userService.findUserByEmailMethod(message.getSender()));
//        chatMessageRepository.save(chatMessage);
////        noticeService.addMessageNotice(chatMessage.getChatRoom(),chatMessage.getWriter(), message.getReceiver(),chatMessage.getTime());
//    }
}
