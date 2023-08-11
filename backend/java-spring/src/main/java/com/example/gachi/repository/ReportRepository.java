package com.example.gachi.repository;

import com.example.gachi.model.Board;
import com.example.gachi.model.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface ReportRepository extends JpaRepository<Report, Long> {


}
