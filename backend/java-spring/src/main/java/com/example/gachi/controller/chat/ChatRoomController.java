package com.example.gachi.controller.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.chat.ChatRoomResponseDto;
import com.example.gachi.model.dto.user.ProfileImgResponseDto;
import com.example.gachi.repository.ChatRoomJoinRepository;
import com.example.gachi.repository.ChatRoomRepository;
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
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJoinRepository chatRoomJoinRepository;


    /**
     * @param userId
     * @return
     * desc: 채팅방 목록 조회
     */
    @GetMapping("/chatroom")
    public ResponseEntity<List<ChatRoomResponseDto>> chatHome(@RequestParam(value = "userId", required = false) Long userId) {
        System.out.println("chatRoomService.findAll()>>>>>>>>>>>>>>>>>"+chatRoomService.findAll(userId));
        List<ChatRoomResponseDto> chatRoomResponseDtos = chatRoomService.findAll(userId);
        return ResponseEntity.ok(chatRoomResponseDtos);
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

    @GetMapping("/chatUser")
    public ResponseEntity<List<User>> chatUser(@RequestParam(required = false) Long roomId) {
        List<ChatRoomJoin> chatRoomJoins = chatRoomJoinRepository.findAllByChatRoomId(roomId);
        List<User> users = chatRoomJoins.stream()
                .map(ChatRoomJoin::getUser)
                .toList();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/chatMaster")
    public Long chatMaster(@RequestParam(required = false) Long id){
        ChatRoom chatRoom = chatRoomRepository.findAllById(id);

        return chatRoom.getUser().getId();
    }
    //채팅방 대표 이미지 가져오기
    @GetMapping("/chatProfile")
    public ResponseEntity<List<ProfileImgResponseDto>> getRoomProfileImg(@RequestParam(required = false) Long userId){
        List<ProfileImgResponseDto> profileImgResponseDtos = chatRoomService.getRoomMasterProfileImg(userId);

        return ResponseEntity.ok(profileImgResponseDtos);
    }
}
