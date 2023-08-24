package com.example.gachi.repository;

import com.example.gachi.model.BanList;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.Report.BanDto;
import com.example.gachi.model.enums.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
    public interface BanListRepository extends JpaRepository<BanList, Long> {


    BanDto findByUser(User user);
    List<BanList> findByUserAndBanStatus(User user, ReportStatus banStatus);

    BanList findByIdAndBanStatus(Long id,ReportStatus banStatus);
}
