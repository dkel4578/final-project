package com.example.gachi.model;

import com.example.gachi.model.enums.BanReason;
import jakarta.persistence.*;
import lombok.*;
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

}
