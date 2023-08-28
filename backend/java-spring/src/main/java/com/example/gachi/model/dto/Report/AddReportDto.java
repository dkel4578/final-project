package com.example.gachi.model.dto.Report;

import com.example.gachi.model.Board;
import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportCategory;
import com.example.gachi.model.enums.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.ibatis.javassist.NotFoundException;

@Data
@AllArgsConstructor
@Builder
public class AddReportDto {
    private Long id;
    private Long contentId;
    private User reporter;
    private Long reporterId;
    private User reportedUser;
    private Long reportedId;
    private BanReason reportType;
    private ReportCategory category;
    private ReportStatus reportStatus;


    public Report toEntity(ReportCategory category, Long contentId, User reportedUser, User reporter, BanReason reportType ) throws NotFoundException {
        return Report.builder()
                .id(id)
                .contentId(contentId)
                .reporter(reporter)
                .reportedUser(reportedUser)
                .reportType(reportType)
                .category(category)
                .reportStatus(ReportStatus.B)
                .build();
    }
}
