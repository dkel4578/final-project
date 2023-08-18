package com.example.gachi.repository;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin, Long> {
    List<ChatRoomJoin> findByUser(User user);
    List<ChatRoomJoin> findByChatRoom(ChatRoom chatRoom);
}
