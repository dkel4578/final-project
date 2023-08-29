package com.example.gachi.service.user;

import com.example.gachi.model.Schedule;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.user.ScheduleAddRequestDto;
import com.example.gachi.model.dto.user.ScheduleResponseDto;
import com.example.gachi.model.dto.user.ScheduleUpdateDto;
import com.example.gachi.repository.ScheduleRepository;
import com.example.gachi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    //스케쥴 추가
    public ScheduleResponseDto addSchedule(ScheduleAddRequestDto scheduleAddRequestDto){
        User user = userRepository.findById(scheduleAddRequestDto.getUserId()).orElseThrow(() -> new EntityNotFoundException("대상을 찾을 수 없습니다."));
        Schedule schedule = scheduleAddRequestDto.addSchedule(user);
        scheduleRepository.save(schedule);
        return ScheduleResponseDto.of(schedule);
    }

    //스케쥴 조회
    public List<ScheduleResponseDto> scheduleList(Long userId){
        List<Schedule> scheduleList = scheduleRepository.findAllByUserIdAndDeleteYn(userId, "N");

        return scheduleList.stream()
                .map(ScheduleResponseDto::of)
                .toList();
    }

    //스케쥴 공유
    public List<ScheduleResponseDto> shareScheduleList(String loginId){
        Long userId = userRepository.findByLoginId(loginId).get().getId();
        List<Schedule> scheduleList = scheduleRepository.findAllByUserIdAndDeleteYn(userId, "N");

        return scheduleList.stream()
                .map(ScheduleResponseDto::of)
                .toList();
    }
    //스케쥴 날짜 체크
    public boolean dateCheck(Long userId, LocalDate date){
        return scheduleRepository.existsByUserIdAndDateAndDeleteYn(userId, date, "N");
    }

    //스케쥴 아이디 찾기
    public Long findId(Long userId, LocalDate date){
        return scheduleRepository.findByUserIdAndDateAndDeleteYn(userId, date, "N")
                .get().getId();
    }

    //스케쥴 업데이트
    @Transactional
    public void update(Long id, ScheduleUpdateDto scheduleUpdateDto){
        Optional<Schedule> scheduleOptional = scheduleRepository.findById(id);

        scheduleOptional.ifPresent(schedule -> {
            schedule.updateSchedule(scheduleUpdateDto.getContent());
        });
    }

    //스케쥴 삭제
    @Transactional
    public void delete(Long id){
        Optional<Schedule> schedule = scheduleRepository.findById(id);

        schedule.ifPresent(schedule1 -> {
            schedule1.deleteSchedule("Y");
        });
    }
}
