package com.example.gachi.repository;


import com.example.gachi.service.chat.ChatRoomJoinService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ChatRoomRepositoryTest {
    @Autowired
    private ChatRoomJoinService chatRoomJoinService;

    @Test
    void chatRoomJoinTest1() {
        // given
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("uid", 4L);
        paramMap.put("chatRoomName", "testroom1");

        // when
        Long roomId = chatRoomJoinService.newRoom(paramMap);

        // then
        assertThat(roomId).isEqualTo(1);
    }
}
