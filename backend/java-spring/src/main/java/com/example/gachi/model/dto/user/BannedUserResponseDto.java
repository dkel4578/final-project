package com.example.gachi.model.dto.user;

import com.example.gachi.model.BanList;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BannedUserResponseDto {
    private Long id;
    private Long bannedId;
    private String loginId;
    private String name;
    private String nickName;
    private String bannedYn;
    private String banReason;
    private BanReason banReasonKeyword;
    private Long reportId;
    private LocalDateTime banStartAt;
    private LocalDateTime banEndAt;
    private ReportStatus banStatus;

    public BannedUserResponseDto(BanList banList) {
        this.id = banList.getId();
        this.loginId = banList.getUser().getLoginId();
        this.bannedId = banList.getUser().getId();
        this.nickName = banList.getUser().getNickname();
        this.name = banList.getUser().getName();
        this.bannedYn = banList.getUser().getBannedYn();
        this.banReasonKeyword = banList.getBanReason();
        this.banReason = banList.getBanReason().getValue();
        this.reportId = banList.getReportId(); /*(banList.getReport() != null) ? banList.getReport().getId() : null;*/
        this.banStartAt = banList.getBanStartAt();
        this.banEndAt = banList.getBanEndAt();
        this.banStatus = banList.getBanStatus();
    }
}