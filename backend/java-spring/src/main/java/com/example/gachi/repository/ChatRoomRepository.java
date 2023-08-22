package com.example.gachi.repository;

import com.example.gachi.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findAllByOrderByIdDesc();
    List<ChatRoom> findAllByUserId(Long userId);

    ChatRoom findAllById(Long id);
}
