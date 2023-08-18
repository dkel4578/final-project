package com.example.gachi.controller.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.service.chat.ChatRoomJoinService;
import com.example.gachi.service.chat.ChatRoomService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomJoinService chatRoomJoinService;
    private final ChatRoomService chatRoomService;

    /**
     * @param loginId
     * @return
     * desc: 채팅방 목록 조회
     */
    @GetMapping("/chatroom")
    public List<ChatRoom> chatHome(@RequestParam(value = "loginId", required = false) String loginId) {
        List<ChatRoom> chatRoomList = chatRoomService.findAll();

        return chatRoomList;
    }

    /**
     * @param paramMap
     * @return
     * @throws JsonProcessingException
     * desc: 채팅방 생성
     */
    @PostMapping("/chatroom")
    public ResponseEntity<Long> createChatRoom(@RequestBody HashMap<String, Object> paramMap) throws JsonProcessingException {
        Long chatRoomId = chatRoomJoinService.newRoom(paramMap);

        return ResponseEntity.ok(chatRoomId);
    }
}
