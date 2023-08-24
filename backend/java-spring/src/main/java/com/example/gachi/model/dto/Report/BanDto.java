package com.example.gachi.model.dto.Report;

import com.example.gachi.model.BanList;
import com.example.gachi.model.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BanDto {
    private Long userId;
    private Long reportId;
    private LocalDateTime banStartAt;
    private LocalDateTime banEndAt;
    private ReportStatus banStatus;
    private String bannedYn;


    public BanDto(BanList banList){
        this.userId = banList.getUser().getId();
        this.reportId = banList.getReportId();
        this.banStatus = banList.getBanStatus();
        this.banStartAt = banList.getBanStartAt();
        this.banEndAt = banList.getBanEndAt();
        this.bannedYn = banList.getUser().getBannedYn();

    }
}
