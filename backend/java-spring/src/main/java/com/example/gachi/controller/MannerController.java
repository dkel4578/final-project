package com.example.gachi.controller;

import com.example.gachi.model.dto.user.MannerRequestDto;
import com.example.gachi.model.dto.user.MannerResponseDto;
import com.example.gachi.service.user.MannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manner")
public class MannerController {
    private final MannerService mannerService;

    @PostMapping("/add")
    public ResponseEntity<MannerResponseDto> addMannerScore(@RequestBody MannerRequestDto mannerRequestDto){
        MannerResponseDto mannerResponseDto = mannerService.addMannerScore(mannerRequestDto);
        return ResponseEntity.ok(mannerResponseDto);
    }

    @GetMapping("/me")
    public ResponseEntity<Double> mannerScore(@RequestParam Long id){
        return ResponseEntity.ok(mannerService.mannerAvgScore(id));
    }
}
