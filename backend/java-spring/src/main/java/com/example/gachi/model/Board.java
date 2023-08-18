package com.example.gachi.model;

import com.example.gachi.model.enums.Kind;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
    @Enumerated(value = EnumType.STRING)
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
    @JsonIgnore
    private User user;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="board_id")
    @JsonIgnore
    @ToString.Exclude
    private List<Comment> comments;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="board_id")
    @JsonIgnore
    @ToString.Exclude
    private List<BrdImg> brdImgs;


    public void setKind(Kind  kind) {
        this.kind = kind;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setCnt(Integer cnt) {
        this.cnt = cnt;
    }
    public void setDelYn(String delYn) {
        this.delYn = delYn;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Board update(String title, String content) {
        this.title = title;
        this.content = content;
        return this;
    }

    @Builder
    public Board(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Builder
    public Board(Kind kind, String title, String content, String delYn, User user) {
        this.kind = kind;
        this.title = title;
        this.content = content;
        this.delYn = delYn;
        this.user = user;
        this.cnt = 0;
    }


    public void updateBoard(String title,
                           String content){
        this.title = title;
        this.content = content;
    }

    public void deleteBoard(String delYn){
        this.delYn = delYn;
    }


}
