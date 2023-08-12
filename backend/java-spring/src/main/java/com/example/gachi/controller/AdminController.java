package com.example.gachi.controller;

import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.user.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private final UserRepository userRepository;

//    @GetMapping("/admin/userList")
//    public


}
