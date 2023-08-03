package com.example.gachi.model.enums;

import lombok.Getter;

@Getter
public enum Kind {
    N("공지사항"),
    Q("FAQ"),
    F("같이 한 끼"),
    C("같이 커피"),
    A("같이 한 잔"),
    T("같이 여행");

    private final String value;
    Kind(String value){
        this.value=value;
    }


}
