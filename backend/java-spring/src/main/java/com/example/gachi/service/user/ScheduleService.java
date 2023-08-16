package com.example.gachi.service.user;

import com.example.gachi.model.Schedule;
import com.example.gachi.model.dto.user.ScheduleAddRequestDto;
import com.example.gachi.model.dto.user.ScheduleResponseDto;
import com.example.gachi.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    //스케쥴 추가
    public ScheduleResponseDto addSchedule(ScheduleAddRequestDto scheduleAddRequestDto){
        Schedule schedule = scheduleAddRequestDto.addSchedule();
        scheduleRepository.save(schedule);
        return ScheduleResponseDto.of(schedule);
    }

    //스케쥴 조회
    public List<ScheduleResponseDto> scheduleList(Long id){
        List<Schedule> scheduleList = scheduleRepository.findAllById(id);

        return scheduleList.stream()
                .map(ScheduleResponseDto::of)
                .toList();
    }
}
