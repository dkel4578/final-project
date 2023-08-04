package com.example.gachi.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Authority {
    ADMIN("ROLE_ADMIN", "관리자"),
    USER("ROLE_USER", "일반 사용자");

    private final String key;
    private final String title;
}
