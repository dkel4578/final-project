package com.example.gachi.controller;

import com.example.gachi.model.dto.user.MannerScoreDto;
import com.example.gachi.service.user.MannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manner")
public class MannerController {
    private final MannerService mannerService;

    @PostMapping("/add")
    public ResponseEntity<String> addMannerScore(@RequestBody MannerScoreDto mannerScoreDto){
        mannerService.addMannerScore(mannerScoreDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("매너 점수 등록 성공");
    }
}
