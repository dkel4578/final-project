package com.example.gachi.model;

import com.example.gachi.model.enums.Kind;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ValueGenerationType;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(callSuper=false)
public class Board extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Kind kind;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private int cnt;

    @Column(nullable = false, columnDefinition = "char(1)")
    @Builder.Default
    private String delYn="N";

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="board_id")
    @ToString.Exclude
    private List<Comment> comments;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="board_id")
    @ToString.Exclude
    private List<BrdImg> brdImgs;

}
