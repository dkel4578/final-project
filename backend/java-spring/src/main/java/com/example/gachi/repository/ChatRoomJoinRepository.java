package com.example.gachi.repository;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin, Long> {

    List<ChatRoomJoin> findByUser(User user);
    //채팅방에 있는 유저 조회
    List<ChatRoomJoin> findAllByChatRoomId(Long roomId);
    //해당 유저가 속해있는 채팅방 부르기
    List<ChatRoomJoin> findChatRoomJoinByUser(User user);

}
