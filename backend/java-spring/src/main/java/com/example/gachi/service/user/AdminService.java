package com.example.gachi.service.user;

import com.example.gachi.model.BanList;
import com.example.gachi.model.Board;
import com.example.gachi.model.Report;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.BannedUserResponseDto;
import com.example.gachi.model.dto.user.UserResponseDto;
import com.example.gachi.repository.BanListRepository;
import com.example.gachi.repository.BoardRepository;
import com.example.gachi.repository.ReportRepository;
import com.example.gachi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
    @Transactional
    public List<Board> getBoard() {
        List<Board> boards = boardRepository.findAll();

        return boards;
    }

}


