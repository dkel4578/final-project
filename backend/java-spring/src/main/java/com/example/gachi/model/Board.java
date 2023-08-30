package com.example.gachi.model;

import com.example.gachi.model.enums.Kind;
import com.fasterxml.jackson.annotation.*;
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
    @JsonBackReference
    private User user;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="board_id")
    @JsonManagedReference
    @ToString.Exclude
    private List<Comment> comments;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="board_id")
    @JsonManagedReference
    @ToString.Exclude
    private List<BrdImg> brdImgs;

    private int commentCount; // 댓글 수를 저장할 필드 추가
    private String localPlace; // 만남장소 필드 추가
    private String localAddress; // 만남주소 필드 추가
    private double latitude; //위도
    private double longitude; //경도




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
    public void setLocalAddress(String localAddress) {
        this.localAddress = localAddress;
    }
    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }
    public void setLocalPlace(String localPlace) {
        this.localPlace = localPlace;
    }
    public void setLatitude(double latitude) {this.latitude = latitude;}
    public void setLongitude(double longitude) {this.longitude = longitude;}




    public Board update(String title, String content) {
        this.title = title;
        this.content = content;
        return this;
    }

    //게시글 조회수 카운트
    public void updateCnt(Long id){
        this.cnt = cnt + 1;
    }

    @Builder
    public Board(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Builder
    public Board(Kind kind,
                 String title,
                 String content,
                 String delYn,
                 User user,
                 String localPlace,
                 String localAddress,
                 Double latitude,
                 Double longitude) {
        this.kind = kind;
        this.title = title;
        this.content = content;
        this.delYn = delYn;
        this.user = user;
        this.cnt = 0;
        this.localPlace = localPlace;
        this.localAddress = localAddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public void updateBoard(String title,
                           String content,
                            String localPlace,
                            String localAddress,
                            Double latitude,
                            Double longitude
                            ){
        this.title = title;
        this.content = content;
        this.localPlace = localPlace;
        this.localAddress = localAddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void deleteBoard(String delYn){
        this.delYn = delYn;
    }

    @JsonCreator
    public Board(@JsonProperty("kind") Kind kind, @JsonProperty("title") String title, @JsonProperty("content") String content) {
        this.kind = kind;
        this.title = title;
        this.content = content;
    }


}
