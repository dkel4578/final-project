package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum BanReason {
    D("게시글/댓글 도배"),
    P("음란성 게시글/댓글 작성"),
    F("욕설/혐오 발언 게시글/댓글 작성"),
    A("광고성 게시글/댓글 작성"),
    R("허위 리뷰 작성"),
    E("기타 사유");

    private final String value;

    BanReason(String value){
        this.value=value;
    }
}
