package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum NotificationType {
    A("답글"),
    B("댓글"),
    C("채팅");

    private final String value;

    NotificationType(String value){ this.value = value; }

}
