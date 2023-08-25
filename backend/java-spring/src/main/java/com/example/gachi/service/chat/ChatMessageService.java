package com.example.gachi.service.chat;

import com.example.gachi.model.ChatMessage;
import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.chat.ChatDto;
import com.example.gachi.model.dto.chat.ChatRequestDto;
import com.example.gachi.model.dto.chat.ChatResponseDto;
import com.example.gachi.repository.ChatMessageRepository;
import com.example.gachi.repository.ChatRoomRepository;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserService userService;
    private final ChatRoomService chatRoomService;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;

//    @Transactional
//    public void save(ChatMessageForm message) {
//        ChatMessage chatMessage = new ChatMessage(message.getMessage(), LocalDateTime.now(),chatRoomService.findById(message.getChatRoomId()).get()
//                ,userService.findUserByEmailMethod(message.getSender()));
//        chatMessageRepository.save(chatMessage);
////        noticeService.addMessageNotice(chatMessage.getChatRoom(),chatMessage.getWriter(), message.getReceiver(),chatMessage.getTime());
//    }

    public ChatResponseDto signupMessage(ChatRequestDto chatRequestDto){
        User user = userRepository.findById(chatRequestDto.getUser().getId()).orElse(null);
        ChatRoom chatRoom = chatRoomRepository.findById(chatRequestDto.getChatRoom().getId()).orElse(null);
        ChatMessage chatMessage = chatRequestDto.signupMessage(user, chatRoom);

        return ChatResponseDto.of(chatMessageRepository.save(chatMessage));
    }

    public ChatResponseDto signupMessage(ChatDto chatDto){
        User user = userRepository.findById(chatDto.getUserId()).orElse(null);
        ChatRoom chatRoom = chatRoomRepository.findById(chatDto.getRoomId()).orElse(null);
        String chat = chatDto.getMessage();

        ChatMessage chatMessage = chatDto.signupMessage(user, chatRoom, chat);

        return ChatResponseDto.of(chatMessageRepository.save(chatMessage));

    }

    public List<ChatResponseDto> chatList(Long roomId){
        List<ChatMessage> chatMessages = chatMessageRepository.findByChatRoomIdOrderByCreateAtAsc(roomId);

        return chatMessages.stream().map(ChatResponseDto::of).toList();
    }
}
