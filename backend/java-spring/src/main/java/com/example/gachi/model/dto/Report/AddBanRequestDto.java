package com.example.gachi.model.dto.Report;


import com.example.gachi.model.BanList;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.ibatis.javassist.NotFoundException;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class AddBanRequestDto {

    private BanReason banReason;
    private Long userId;
    private Long reportId;
    private LocalDateTime banStartAt;
    private LocalDateTime banEndAt;
    private ReportStatus banStatus;
    private String bannedYn;

    public BanList toEntity(User user,Long banDays, ReportStatus banStatus, BanReason banReason, Long reportId) throws NotFoundException{
        return BanList.builder()
                .banReason(banReason)
                .user(user)
                .reportId(reportId)
                .banStatus(banStatus)
                .banStartAt(LocalDateTime.now())
                .banEndAt(LocalDateTime.now().plusDays(banDays))
                .build();
    }
}
