package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum ReportCategory {
    B("게시판"),
    D("댓글"),
    C("채팅");

    private final String value;

    ReportCategory(String value){
        this.value=value;
    }
}
