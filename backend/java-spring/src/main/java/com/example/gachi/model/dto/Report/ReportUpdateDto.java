package com.example.gachi.model.dto.Report;

import com.example.gachi.model.enums.ReportStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ReportUpdateDto {
    private final ReportStatus reportStatus;
    @Builder
    ReportUpdateDto(ReportStatus reportStatus){this.reportStatus = reportStatus;}
}
