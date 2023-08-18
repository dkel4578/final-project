package com.example.gachi.service.board;

import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.Report.ReportRequestDto;
import com.example.gachi.model.dto.board.ReportResponseDto;
import com.example.gachi.repository.ReportRepository;
import com.example.gachi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;

    public ReportResponseDto reportUser(ReportRequestDto reportRequestDto){
        User reporter = userRepository.findById(reportRequestDto.getReporterId()).orElseThrow(() -> new EntityNotFoundException("신고자를 찾을 수 없습니다."));
        User reported = userRepository.findById(reportRequestDto.getReportedUserId()).orElseThrow(() -> new EntityNotFoundException("신고받은 사람을 찾을 수 없습니다."));

        Report report = reportRequestDto.reportUser(reporter, reported);
        reportRepository.save(report);

        return ReportResponseDto.of(report);
    }
}
