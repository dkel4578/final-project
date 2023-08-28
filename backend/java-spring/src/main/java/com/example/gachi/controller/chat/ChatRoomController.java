package com.example.gachi.controller.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.chat.*;
import com.example.gachi.model.dto.user.ProfileImgResponseDto;
import com.example.gachi.repository.ChatRoomJoinRepository;
import com.example.gachi.repository.ChatRoomRepository;
import com.example.gachi.repository.ProfileImgRepository;
import com.example.gachi.service.chat.ChatRoomJoinService;
import com.example.gachi.service.chat.ChatRoomService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomJoinService chatRoomJoinService;
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJoinRepository chatRoomJoinRepository;
    private final ProfileImgRepository profileImgRepository;


    /**
     * @param userId
     * @return desc: 채팅방 목록 조회
     */
    @GetMapping("/chatroom")
    public ResponseEntity<List<ChatRoomResponseDto>> chatHome(@RequestParam(value = "userId", required = false) Long userId) {
        System.out.println("chatRoomService.findAll()>>>>>>>>>>>>>>>>>" + userId);
        List<ChatRoomResponseDto> chatRoomResponseDtos = chatRoomService.findAll(userId);
        return ResponseEntity.ok(chatRoomResponseDtos);
    }

    /**
     * @param paramMap
     * @return
     * @throws JsonProcessingException desc: 채팅방 생성
     */
    @PostMapping("/chatroom")
    public ResponseEntity<Long> createChatRoom(@RequestBody HashMap<String, Object> paramMap) throws JsonProcessingException {
        Long chatRoomId = chatRoomJoinService.newRoom(paramMap);

        return ResponseEntity.ok(chatRoomId);
    }

    //채팅방 유저 가져오기
    @GetMapping("/chatUser")
    public ResponseEntity<List<UserWithProfileImgDto>> chatUser(@RequestParam(required = false) Long roomId) {
        // user, chatRoom, chatroomjoin, profileimg
        List<ChatRoomJoin> chatRoomJoins = chatRoomJoinRepository.findAllByChatRoomIdAndBannedYn(roomId, "N");
//        List<User> users = chatRoomJoins.stream()
//                .map(ChatRoomJoin::getUser)
//                .toList();
        List<UserWithProfileImgDto> users = chatRoomJoins.stream()
                .map(chatRoomJoin -> {
                    Long userId = chatRoomJoin.getUser().getId();
                    Optional<ProfileImg> optionalProfileImg = profileImgRepository.findFirstByUserIdOrderByCreateAtDesc(userId);
                    String profileImgSrc = profileImgRepository.findFirstByUserIdOrderByCreateAtDesc(1L).get().getImgSrc();

                    if (optionalProfileImg.isPresent()) {
                        profileImgSrc = optionalProfileImg.get().getImgSrc();
                        // 이후 처리
                    }
                    String nickname = chatRoomJoin.getUser().getNickname();
                    return new UserWithProfileImgDto(userId, profileImgSrc, nickname);
                })
                .toList();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/chatMaster")
    public Long chatMaster(@RequestParam(required = false) Long id) {
        ChatRoom chatRoom = chatRoomRepository.findAllByIdAndDeleteYn(id, "N");

        return chatRoom.getUser().getId();
    }

    //채팅방 대표 이미지 가져오기
    @GetMapping("/chatProfile")
    public ResponseEntity<List<ProfileImgResponseDto>> getRoomProfileImg(@RequestParam(required = false) Long userId) {
        List<ProfileImgResponseDto> profileImgResponseDtos = chatRoomService.getRoomMasterProfileImg(userId);

        return ResponseEntity.ok(profileImgResponseDtos);
    }

    @PutMapping("/quitChatRoom")
    public void quitChatRoom(@RequestParam Long userId, @RequestParam Long roomId) {
        chatRoomJoinService.chatEnd(userId, roomId);
    }

    @GetMapping("/findRoomName")
    public String findRoomName(@RequestParam Long roomId) {
        return chatRoomRepository.findById(roomId).get().getName();

    }

    @PostMapping("/chatRoomJoin")
    public ResponseEntity<?> chatRoomJoin(@RequestParam Long roomId, @RequestParam Long userId) {
        if (chatRoomJoinService.chatRoomJoinCheck(roomId, userId)) {
            String errorMessage = "이미 참여한 채팅방입니다.";
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
        ChatRoomJoinResponseDto chatRoomJoinResponseDto = chatRoomJoinService.signupRoom(roomId, userId);
        return ResponseEntity.ok(chatRoomJoinResponseDto);
    }
}