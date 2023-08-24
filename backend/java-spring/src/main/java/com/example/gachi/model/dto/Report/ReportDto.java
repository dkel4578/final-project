package com.example.gachi.model.dto.Report;

import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
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
    private BanReason reportTypeKeyword;
    private User reporter;
    private String reporterNickName;
    private String reporterId;
    private Long reportersId;
    private Long reportedUsersId;
    private User reportedUser;
    private String reportedUserNickName;
    private String reportedUserId;
    private String bannedYn;
    private String reportStatus;
    private ReportStatus reportStatusKeyword;
    private String category;
    private ReportCategory categoryKeyword;
    private Long contentId;




    public ReportDto(Report report) {

        this.id = report.getId();
        this.reportType = report.getReportType().getValue();
        this.reportTypeKeyword = report.getReportType();
        this.reporterNickName = report.getReporter().getNickname();
        this.reportersId = report.getReporter().getId();
        this.reporterId = report.getReporter().getLoginId();
        this.reportedUserNickName = report.getReportedUser().getNickname();
        this.reportedUserId = report.getReportedUser().getLoginId(); /*!= null ? report.getReportedUser().getId() : null;*/
        this.reportStatusKeyword = report.getReportStatus();
        this.reportStatus = report.getReportStatus().getValue();
        this.category = report.getCategory().getValue();
        this.categoryKeyword = report.getCategory();
        this.contentId = report.getContentId();
        this.bannedYn = report.getReportedUser().getBannedYn();
        this.reportedUsersId = report.getReportedUser().getId();
    }
}
