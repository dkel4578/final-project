package com.example.gachi.model.dto.user;

import com.example.gachi.model.Schedule;
import com.example.gachi.model.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ScheduleAddRequestDto {

    private Long id;
    private User user;
    private Long userId;
    private LocalDate date;
    private String content;

    //스케쥴 추가
    public Schedule addSchedule(){
        return Schedule.builder()
                .user(user)
                .date(date)
                .content(content)
                .build();
    }

}
