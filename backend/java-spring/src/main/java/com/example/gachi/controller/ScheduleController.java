package com.example.gachi.controller;

import com.example.gachi.model.dto.user.ScheduleAddRequestDto;
import com.example.gachi.model.dto.user.ScheduleResponseDto;
import com.example.gachi.model.dto.user.ScheduleUpdateDto;
import com.example.gachi.service.user.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    //스케쥴 조회
    @GetMapping("/view")
    public ResponseEntity<List<ScheduleResponseDto>> viewSchedule(@RequestParam Long userId){
        List<ScheduleResponseDto> scheduleResponseDto = scheduleService.scheduleList(userId);
        return ResponseEntity.ok(scheduleResponseDto);
    }

    //스케쥴 날짜에 데이터 있는지 체크
    @GetMapping("/view/date")
    public boolean viewDate(@RequestParam Long userId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        return scheduleService.dateCheck(userId, date);
    }

    @GetMapping("/findId")
    public Long findId(@RequestParam Long userId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return scheduleService.findId(userId, date);
    }

    @PutMapping("/update/{scheduleId}")
    public void update(@PathVariable Long scheduleId, @RequestBody ScheduleUpdateDto scheduleUpdateDto){
        scheduleService.update(scheduleId, scheduleUpdateDto);
    }

    @PutMapping("/delete/{scheduleId}")
    public void delete(@PathVariable Long scheduleId){
        scheduleService.delete(scheduleId);
    }

}
