package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum Review {
    K("너무 친절해요"),
    F("시간 가는줄 모르고 떠들었어요"),
    D("맛집을 잘 알려줘요"),
    P("사진을 잘 찍어요");

    private final String value;

    Review(String value) {
        this.value = value;
    }

}
