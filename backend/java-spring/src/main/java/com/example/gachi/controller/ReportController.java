package com.example.gachi.controller;
import com.example.gachi.model.dto.Report.AddReportDto;
import com.example.gachi.model.dto.Report.ReportRequestDto;
import com.example.gachi.model.dto.Report.ReportResponseDto;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportCategory;
import com.example.gachi.service.board.ReportService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/report")
public class ReportController {
    private final ReportService reportService;


    @PostMapping("/")
    public ResponseEntity<ReportResponseDto> reportUser(@RequestBody ReportRequestDto reportRequestDto){
        ReportResponseDto reportResponseDto = reportService.reportUser(reportRequestDto);
        return ResponseEntity.ok(reportResponseDto);
    }


    @PostMapping("/insert")
    public ResponseEntity<?> reportInsert(@RequestParam ReportCategory category,
                                          @RequestParam Long contentId,
                                          @RequestParam Long reportedId,
                                          @RequestParam Long reporterId,
                                          @RequestParam BanReason reportType
    )throws NotFoundException {
        reportService.save(category,contentId,reportedId,reporterId,reportType);
        return ResponseEntity.status(HttpStatus.CREATED).body("신고 등록 성공");
    }


}
