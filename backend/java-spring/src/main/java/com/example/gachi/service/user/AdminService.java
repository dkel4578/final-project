package com.example.gachi.service.user;

import com.example.gachi.model.BanList;
import com.example.gachi.model.Board;
import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.Report.AddBanRequestDto;
import com.example.gachi.model.dto.Report.BanDto;
import com.example.gachi.model.dto.user.BannedUserResponseDto;
import com.example.gachi.model.dto.user.BannedUserStatusUpdateDto;
import com.example.gachi.model.dto.user.UserResponseDto;
import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportStatus;
import com.example.gachi.repository.BanListRepository;
import com.example.gachi.repository.BoardRepository;
import com.example.gachi.repository.ReportRepository;
import com.example.gachi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;
    private final BanListRepository banListRepository;
    private final BoardRepository boardRepository;


    @Transactional
    public List<BanList> getBannedUser/*ByBannedYn*/(/*String bannedYn*/) {
        List<BanList> banLists = banListRepository.findAll();
        return banLists;
    }

    @Transactional
    public List<Report> getReportedUser() {
        List<Report> reports = reportRepository.findAll();

        return reports;

    }
    @Transactional
    public List<User> getUser() {
        List<User> users = userRepository.findAll();

        return users;
    }
//    public List<BanList> getBannedUser(Long userId) throws NotFoundException {
//        User userEntity = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found444444"));
////        BanDto banDto = banListRepository.findByUserId(userEntity);
//        return banListRepository.findByUser(userEntity);
//    }
    public List<BanDto> getBannedUserDtos(Long userId) throws NotFoundException {
        User userEntity = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

        List<BanList> banList = banListRepository.findByUserAndBanStatus(userEntity, ReportStatus.J);

        return banList.stream()
                .map(BanDto::new)
                .collect(Collectors.toList());
    }


    @Transactional
    public List<Board> getBoard() {
        List<Board> boards = boardRepository.findAll();

        return boards;
    }

    public BanList banSave(AddBanRequestDto addBanRequestDto, Long banDays, Long userId, BanReason banReason,Long reportId) throws NotFoundException{
        User userEntitiy = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not Found"));
        BanList banList = addBanRequestDto.toEntity(userEntitiy,banDays, ReportStatus.J,banReason,reportId);
        return banListRepository.save(banList);
    }
    @Transactional
    public void userBanUpdate(Long userId, BannedUserStatusUpdateDto bannedUserStatusUpdateDto,String bannedYn)throws NotFoundException {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not Found"));
        user.updateUserBan(bannedYn);
    }
    @Transactional
    public void reportStatusUpdateForAllWithReportedId(Long reportedUserId) throws NotFoundException {
        List<Report> reportsToUpdate = reportRepository.findAllByReportedUser_Id(reportedUserId);

        for (Report report : reportsToUpdate) {
            report.setReportStatus(ReportStatus.C); // Set the report status to "C"
            // You can also perform any other necessary actions or validations here
        }

        reportRepository.saveAll(reportsToUpdate);
    }
    public void banClearSave(AddBanRequestDto addBanRequestDto,Long id ,Long userId) throws NotFoundException{
//        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not Found"));
//        BanList banList = banListRepository.findById(id).orElseThrow(()->
//                new IllegalArgumentException("해당 밴 기록이 존재 하지 않습니다."));
        User userEntity = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

        List<BanList> banLists = banListRepository.findByUserAndBanStatus(userEntity, ReportStatus.J);
        BanList banList = banLists.get(0);
        System.out.println("banList Before:" + banList);
        banList.updateUserBan(ReportStatus.N);
        System.out.println("banList After:" + banList);
        banListRepository.save(banList);
        userRepository.save(userEntity);
    }

    }


