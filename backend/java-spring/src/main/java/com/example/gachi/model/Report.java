package com.example.gachi.model;

import com.example.gachi.model.enums.BanReason;
import com.example.gachi.model.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(callSuper=false)
public class Report extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BanReason reportType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", nullable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User reportedUser;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private ReportStatus reportStatus;    //현재 신고 상태 (신고처리가 되었는가 아닌가)

    @Column(nullable = false)
    private Long contentId;



}
