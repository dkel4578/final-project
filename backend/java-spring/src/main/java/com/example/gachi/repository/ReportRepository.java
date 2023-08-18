package com.example.gachi.repository;

import com.example.gachi.model.Board;
import com.example.gachi.model.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface ReportRepository extends JpaRepository<Report, Long> {


    List<Report> findAll(); //ReportStatus 살릴경우 findByReportStatus 할것


}
