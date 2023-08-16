package com.example.gachi.repository;

import com.example.gachi.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByUserIdAndDeleteYn(Long userId, String deleteYn);

    boolean existsByUserIdAndDateAndDeleteYn(Long userId, LocalDate date, String deleteYn);

    Optional<Schedule> findByUserIdAndDateAndDeleteYn(Long userId, LocalDate date, String deleteYn);

}
