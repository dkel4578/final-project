package com.example.gachi.util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Already exists")
public class BadRequestException extends RuntimeException {
//오류 메세지 전송
    public BadRequestException(String message) {
        super(message);
    }
}