package com.example.gachi.model.dto.user;

import com.example.gachi.model.Schedule;
import com.example.gachi.model.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter

public class ScheduleAddRequestDto {

    private final Long userId;
    private final LocalDate date;
    private final String content;

    //스케쥴 추가
    @Builder
    public Schedule addSchedule(User user){
        return Schedule.builder()
                .user(user)
                .date(date)
                .content(content)
                .build();
    }

    public ScheduleAddRequestDto(Long userId, LocalDate date, String content) {
        this.userId = userId;
        this.date = date;
        this.content = content;
    }
}
