package com.example.gachi.model.dto.Report;

import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.ReportCategory;
import com.example.gachi.model.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportDto {
    private Long id;
    private String reportType;
    private User reporter;
    private String reporterNickName;
    private String reporterId;
    private User reportedUser;
    private String reportedUserNickName;
    private String reportedUserId;
    private String reportStatus;
    private ReportStatus reportStatusKeyword;
    private String category;
    private ReportCategory categoryKeyword;
    private Long contentId;




    public ReportDto(Report report) {

        this.id = report.getId();
        this.reportType = report.getReportType().getValue();
        this.reporterNickName = report.getReporter().getNickname();
        this.reporterId = report.getReporter().getLoginId(); /*!= null ? report.getReporter().getId() : null;*/
        this.reportedUserNickName = report.getReportedUser().getNickname();
        this.reportedUserId = report.getReportedUser().getLoginId(); /*!= null ? report.getReportedUser().getId() : null;*/
        this.reportStatusKeyword = report.getReportStatus();
        this.reportStatus = report.getReportStatus().getValue();
        this.category = report.getCategory().getValue();
        this.categoryKeyword = report.getCategory();
        this.contentId = report.getContentId();
    }
}
