package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum ReportStatus {
    B("신고 처리 전"),
    D("신고 반려"),
    C("신고 처리 완료"),
    J("현재 정지 중"),
    N("정지 중간 해제"),
    G("정지 기간 만료");

    private final String value;

    ReportStatus(String value){
        this.value=value;
    }
}
