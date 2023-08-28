package com.example.gachi.controller;


import com.example.gachi.model.BanList;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.Report.AddBanRequestDto;
import com.example.gachi.model.dto.Report.BanDto;
import com.example.gachi.model.dto.Report.ReportDto;
import com.example.gachi.model.dto.Report.ReportUpdateDto;
import com.example.gachi.model.dto.board.AddBoardRequestDto;
import com.example.gachi.model.dto.board.BoardAdminDto;
import com.example.gachi.model.dto.user.BannedUserResponseDto;
import com.example.gachi.model.dto.user.BannedUserStatusUpdateDto;
import com.example.gachi.model.dto.user.UserDto;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportStatus;
import com.example.gachi.repository.BanListRepository;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.user.AdminService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private BanListRepository banListRepository;



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

//    @GetMapping("/board/{id}")
//    public ResponseEntity<BoardResponseDto> findboards(@PathVariable long id) {
//        Board board = boardService.getBoard(id);
////        return ResponseEntity.ok().body(new BoardResponseDto(board));
//        return ResponseEntity.ok().body(new BoardResponseDto(board.getId(), board.getTitle(), board.getContent(), board.getCnt(), board.getCreateAt()));
//    }
//    @GetMapping("/admin/getBanUser/{id}")
//    public  ResponseEntity<List<BanList>> getBanUser(@PathVariable Long id) throws NotFoundException {
//
//        Optional<User> userOptional = userRepository.findById(id);
////        User user = userOptional.g
//
//        List<BanList> banList = adminService.getBannedUser(id);
//
//
//        return ResponseEntity.ok().body(banDto);
//
//
//    }

    @GetMapping("/admin/getBanUser/{id}")
    public ResponseEntity<List<BanDto>> getBanUser(@PathVariable Long id) throws NotFoundException {
        List<BanDto> banDtoList = adminService.getBannedUserDtos(id);
        return ResponseEntity.ok().body(banDtoList);
    }


//    밴 아닌 유저 밴
    @PostMapping("/admin/ban/add")
    public ResponseEntity<String> addBan
            (@RequestBody AddBanRequestDto addBanRequestDto,
             BannedUserStatusUpdateDto bannedUserStatusUpdateDto,
             Long banDays,
             Long userId,
             Long reportId,
             BanReason banReason)  throws NotFoundException {
        String bannedYn = "Y";
        adminService.banSave(addBanRequestDto,banDays,userId,banReason,reportId);
        adminService.userBanUpdate(userId,bannedUserStatusUpdateDto,bannedYn);
        return ResponseEntity.status(HttpStatus.CREATED).body("정지 완료.");

    }
    @PostMapping("/admin/ban/update")
    public void updateReportStatus(
            @RequestParam Long reportedId
    ) throws NotFoundException {
        adminService.reportStatusUpdateForAllWithReportedId(reportedId);
    }
    @PostMapping("/admin/ban/clearBan")
    public ResponseEntity<String> clearBan
            (@RequestBody AddBanRequestDto addBanRequestDto,
             BannedUserStatusUpdateDto bannedUserStatusUpdateDto,
             Long id,
             Long userId)  throws NotFoundException {
        String bannedYn = "N";
        adminService.userBanUpdate(userId,bannedUserStatusUpdateDto,bannedYn);
        adminService.banClearSave(addBanRequestDto,id,userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("정지 해제 완료.");

    }

}
