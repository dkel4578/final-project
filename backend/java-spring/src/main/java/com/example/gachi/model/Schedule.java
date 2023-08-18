package com.example.gachi.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(callSuper=false)
public class Schedule extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    @Builder.Default
    private String deleteYn = "N";

    public void updateSchedule(String content){
        this.content = content;
    }

    public void deleteSchedule(String deleteYn){
        this.deleteYn = deleteYn;
    }
}
