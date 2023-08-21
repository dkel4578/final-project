package com.example.gachi.repository;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin, Long> {
    List<ChatRoomJoin> findUserByChatRoom(ChatRoom chatRoom);
    List<ChatRoomJoin> findByUser(User user);
    List<ChatRoomJoin> findByChatRoom(Optional<ChatRoom> chatRoom);

    List<ChatRoomJoin> findAllByChatRoomId(Long roomId);

}
