package com.example.gachi.model.dto.user;

import com.example.gachi.model.Schedule;
import com.example.gachi.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
@JsonIgnoreProperties({"user"})
public class ScheduleResponseDto {

    private Long id;
    private Long userId;
    private LocalDate date;
    private String content;
    private String loginId;

    public static ScheduleResponseDto of(Schedule schedule){
        return ScheduleResponseDto.builder()
                .id(schedule.getId())
                .loginId(schedule.getUser().getLoginId())
                .userId(schedule.getUser().getId())
                .date(schedule.getDate())
                .content(schedule.getContent())
                .build();
    }
}
