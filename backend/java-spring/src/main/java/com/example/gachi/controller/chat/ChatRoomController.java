package com.example.gachi.controller.chat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatRoomController {
    @GetMapping("/chatroom")
    public Object chatHome(@RequestParam(value = "loginId", required = false) String loginId) {
        return Arrays.asList();
    }

    @PostMapping("/chatroom")
    public ResponseEntity<String> createChatRoom(@RequestBody HashMap<String, Object> paramMap) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
//        TypeReference<Map<String, Object>> typeReference = new TypeReference<>() {};
//        Map<String, Object> paramMap = objectMapper.readValue(jsonStr, typeReference);

        return ResponseEntity.ok("abc123, ");
    }
}
