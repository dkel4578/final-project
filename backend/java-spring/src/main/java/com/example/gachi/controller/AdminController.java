package com.example.gachi.controller;


import com.example.gachi.model.BanList;
import com.example.gachi.model.dto.Report.ReportDto;
import com.example.gachi.model.dto.board.BoardAdminDto;
import com.example.gachi.model.dto.user.BannedUserResponseDto;
import com.example.gachi.model.dto.user.UserDto;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.user.AdminService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private final UserRepository userRepository;



//    밴된 유저 리스트 Json 형식으로 보내기
    @GetMapping("/admin/bannedUserList")
    public ResponseEntity<List<BannedUserResponseDto>> bannedUserList(HttpServletResponse response){

        List<BannedUserResponseDto> bannedUserList = adminService.getBannedUser()
                .stream()
                .map(BannedUserResponseDto::new)
                .toList();
        return ResponseEntity.ok().body(bannedUserList);



    }


    @GetMapping("/admin/reportedUserList")
    public ResponseEntity<List<ReportDto>> reportUserList(HttpServletResponse response) {
        List<ReportDto> reportedUserList = adminService.getReportedUser()
                .stream()
                .map(ReportDto::new)
                .toList();
        return ResponseEntity.ok().body(reportedUserList);
    }


    @GetMapping("/admin/userList")
    public  ResponseEntity<List<UserDto>> userList(HttpServletResponse response) {
        List<UserDto> userList = adminService.getUser()
                .stream()
                .map(UserDto::new)
                .toList();
        return ResponseEntity.ok().body(userList);
    }
    @GetMapping("/admin/boardList")
    public  ResponseEntity<List<BoardAdminDto>> boardList(HttpServletResponse response) {
        List<BoardAdminDto> userList = adminService.getBoard()
                .stream()
                .map(BoardAdminDto::new)
                .toList();
        return ResponseEntity.ok().body(userList);
    }

}
