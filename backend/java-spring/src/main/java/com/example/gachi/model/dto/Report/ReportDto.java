package com.example.gachi.model.dto.Report;

import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportCategory;
import com.example.gachi.model.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportDto {
    private Long id;
    private BanReason reportType;
    private User reporter;
    private String reporterName;
    private Long reporterId;
    private User reportedUser;
    private String reportedUserName;
    private Long reportedUserId;
    private ReportStatus reportStatus;
    private ReportCategory category;
    private Long contentId;




    public ReportDto(Report report) {

        this.id = report.getId();
        this.reportType = report.getReportType();
        this.reporterName = report.getReporter().getName();
        this.reporterId = report.getReporter().getId(); /*!= null ? report.getReporter().getId() : null;*/
        this.reportedUserName = report.getReportedUser().getName();
        this.reportedUserId = report.getReportedUser().getId(); /*!= null ? report.getReportedUser().getId() : null;*/
        this.reportStatus = report.getReportStatus();
        this.category = report.getCategory();
        this.contentId = report.getContentId();
    }
}
