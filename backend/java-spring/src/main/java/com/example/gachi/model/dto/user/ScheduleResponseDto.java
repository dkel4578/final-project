package com.example.gachi.model.dto.user;

import com.example.gachi.model.Schedule;
import com.example.gachi.model.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class ScheduleResponseDto {

    private Long id;
    private User user;
    private Long userId;
    private LocalDate date;
    private String content;

    public static ScheduleResponseDto of(Schedule schedule){
        return ScheduleResponseDto.builder()
                .id(schedule.getId())
                .user(schedule.getUser())
                .userId(schedule.getUser().getId())
                .date(schedule.getDate())
                .content(schedule.getContent())
                .build();
    }
}
