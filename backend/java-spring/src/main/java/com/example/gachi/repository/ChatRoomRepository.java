package com.example.gachi.repository;

import com.example.gachi.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    ChatRoom findAllById(Long id);
    //해당 유저가 속해 있는 채팅방들 중 마스터 조회

}
