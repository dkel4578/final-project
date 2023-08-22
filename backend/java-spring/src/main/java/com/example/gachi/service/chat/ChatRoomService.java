package com.example.gachi.service.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.dto.chat.ChatRoomResponseDto;
import com.example.gachi.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJoinService chatRoomJoinService;

    public Optional<ChatRoom> findById(Long id) {
        return chatRoomRepository.findById(id);
    }

    public List<ChatRoomResponseDto> findAll(Long userId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllByUserId(userId);
        return chatRoomList.stream()
                .map(ChatRoomResponseDto::of)
                .toList();
    }
}
