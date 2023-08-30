package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum ReportCategory {
    B("게시판"),
    C("댓글"),
    M("채팅");

    private final String value;

    ReportCategory(String value){
        this.value=value;
    }
}
