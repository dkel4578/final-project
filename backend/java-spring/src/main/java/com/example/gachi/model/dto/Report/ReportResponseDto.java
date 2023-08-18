package com.example.gachi.model.dto.board;

import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportCategory;
import com.example.gachi.model.enums.ReportStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReportResponseDto {
    private Long id;
    private BanReason reportType;
    private User reporter;
    private Long reporterId;
    private User reportedUser;
    private Long reportedUserId;
    private ReportStatus reportStatus;
    private ReportCategory category;
    private Long contentId;

    public static ReportResponseDto of(Report report){
        return ReportResponseDto.builder()
                .id(report.getId())
                .category(report.getCategory())
                .contentId(report.getContentId())
                .reportType(report.getReportType())
                .reportStatus(report.getReportStatus())
                .reporter(report.getReporter())
                .reporterId(report.getReporter().getId())
                .reportedUser(report.getReportedUser())
                .reportedUserId(report.getReportedUser().getId())
                .build();
    }

}
