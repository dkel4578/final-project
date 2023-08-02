package com.example.gachi.controller;


import com.example.gachi.service.Test1Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test1")
@RequiredArgsConstructor
public class Test1Controller {
    private final Test1Service test1Service;

    @GetMapping("/gettest1")
    public String gettest1() {
        return "get테스트1";
    }
}
