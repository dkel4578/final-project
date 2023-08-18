package com.example.gachi.controller;

import com.example.gachi.model.dto.Report.ReportRequestDto;
import com.example.gachi.model.dto.board.ReportResponseDto;
import com.example.gachi.service.board.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReportController {
    private final ReportService reportService;


    @PostMapping("/report")
    public ResponseEntity<ReportResponseDto> reportUser(@RequestBody ReportRequestDto reportRequestDto){
        ReportResponseDto reportResponseDto = reportService.reportUser(reportRequestDto);
        return ResponseEntity.ok(reportResponseDto);
    }
}
