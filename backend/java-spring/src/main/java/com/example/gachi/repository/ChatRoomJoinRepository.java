package com.example.gachi.repository;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin, Long> {

    List<ChatRoomJoin> findByUserAndBannedYn(User user, String bannedYn);
    //채팅방에 있는 유저 조회
    List<ChatRoomJoin> findAllByChatRoomIdAndBannedYn(Long roomId, String bannedYn);
    //해당 유저가 속해있는 채팅방 부르기
    List<ChatRoomJoin> findChatRoomJoinByUserAndBannedYn(User user, String bannedYn);
    //해당 유저가 채팅 종료시 방 밴 처리
    ChatRoomJoin findChatRoomJoinByUserAndChatRoom(User user, ChatRoom chatRoom);

    List<Long> findRoomIdByChatRoomIdAndBannedYn(Long userId, String bannedYn);

    boolean existsByChatRoomIdAndUserId(Long roomId, Long userId);

    boolean existsByChatRoomIdAndUserIdAndBannedYn(Long roomId, Long userId, String bannedYn);
}
