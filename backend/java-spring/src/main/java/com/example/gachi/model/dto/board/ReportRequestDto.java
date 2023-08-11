package com.example.gachi.model.dto.board;

import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ReportRequestDto {
    private BanReason reportType;
    private User reporter;
    private Long reporterId;
    private User reportedUser;
    private Long reportedUserId;
    @Builder
    public Report reportUser(User reporteUser, User reportedUser){
        return Report.builder()
                .reportType(reportType)
                .reporter(reporteUser)
                .reportedUser(reportedUser)
                .build();
    }

    public ReportRequestDto(BanReason reportType, Long reporterId, Long reportedUserId){
        this.reportType = reportType;
        this.reporterId = reporterId;
        this.reportedUserId = reportedUserId;
    }
}
