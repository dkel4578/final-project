package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum ReportStatus {
    B("신고 처리 전"),
    D("신고 삭제"),
    C("신고 처리 완료");

    private final String value;

    ReportStatus(String value){
        this.value=value;
    }
}
