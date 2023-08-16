package com.example.gachi.controller;

import com.example.gachi.model.dto.user.ScheduleAddRequestDto;
import com.example.gachi.model.dto.user.ScheduleResponseDto;
import com.example.gachi.service.user.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    //스케쥴 추가
    @PostMapping("/add")
    public ResponseEntity<ScheduleResponseDto> addSchedule(@RequestBody ScheduleAddRequestDto scheduleAddRequestDto){
        ScheduleResponseDto scheduleResponseDto = scheduleService.addSchedule(scheduleAddRequestDto);
        return ResponseEntity.ok(scheduleResponseDto);
    }

    @GetMapping("/view")
    public ResponseEntity<List<ScheduleResponseDto>> viewSchedule(@RequestParam Long id){
        List<ScheduleResponseDto> scheduleResponseDto = scheduleService.scheduleList(id);
        return ResponseEntity.ok(scheduleResponseDto);
    }

}
