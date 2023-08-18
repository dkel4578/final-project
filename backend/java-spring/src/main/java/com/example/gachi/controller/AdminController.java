package com.example.gachi.controller;

import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.BannedUserResponseDto;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.user.AdminService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
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

    @GetMapping("/admin/bannedUserList")
    public void bannedUserList(HttpServletResponse response){
        JSONArray jsonArray = new JSONArray();

        List<BannedUserResponseDto> bannedUserResponseDtoList = adminService.getBannedUserByBannedYn("Y");

        for (BannedUserResponseDto dto : bannedUserResponseDtoList) {
            JSONObject userJson = new JSONObject();
            userJson.put("id", dto.getId());
            userJson.put("loginId", dto.getLoginId());
            userJson.put("name", dto.getName());
            userJson.put("bannedYn", dto.getBannedYn());
            userJson.put("banReason", dto.getBanReason());
            userJson.put("banStartAt", dto.getBanStartAt());
            userJson.put("banEndAt", dto.getBanEndAt());
            userJson.put("reportId", dto.getReportId());

            jsonArray.put(userJson);
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            response.getWriter().print(jsonArray.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }


    }



}
