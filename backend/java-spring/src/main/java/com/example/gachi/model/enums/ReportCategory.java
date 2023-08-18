package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum ReportCategory {
    B("게시판"),
    D("댓글"),
    C("신고 처리 완료");

    private final String value;

    ReportCategory(String value){
        this.value=value;
    }
}
