package com.example.gachi.model.dto.Report;

import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties({"reporter", "reportedUser"})

public class ReportRequestDto {
    private BanReason reportType;
    private User reporter;
    private Long reporterId;
    private User reportedUser;
    private Long reportedUserId;
    @Builder
    public Report reportUser(User reporterUser, User reportedUser){
        return Report.builder()
                .reportType(reportType)
                .reporter(reporterUser)
                .reportedUser(reportedUser)
                .build();
    }

    public ReportRequestDto(BanReason reportType, Long reporterId, Long reportedUserId){
        this.reportType = reportType;
        this.reporterId = reporterId;
        this.reportedUserId = reportedUserId;
    }
}
