package com.example.gachi.model;

import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(callSuper=false)
public class BanList extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BanReason banReason;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false)
    private Long reportId;

    @Column(nullable = false)
    private LocalDateTime banStartAt;

    @Column(nullable = false)
    private LocalDateTime banEndAt;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    @Builder.Default
    private ReportStatus banStatus = ReportStatus.J;

    public void updateUserBan(ReportStatus banStatus){
        this.banStatus = banStatus;
    }

}
