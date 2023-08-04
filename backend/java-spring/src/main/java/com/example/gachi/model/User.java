package com.example.gachi.model;
import com.example.gachi.model.enums.Provider;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String loginId;

    @Column(nullable = false)
    private String name;

    private String accessToken;

    private LocalDateTime accessTokenExpireIn;

    private String refreshToken;

    private LocalDateTime refreshTokenExpireIn;

    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, columnDefinition = "char(1)")
    private String gender;

    @Column(nullable = false)
    @Size(min=1, max=16)
    private String nickname;

    private String profileMessage;

    @Column(nullable = false)
    private LocalDate birth;

    @Column(nullable = false, columnDefinition = "char(1)")
    @Builder.Default
    private String status = "U";

    @Column(nullable = false)
    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private Provider provider= Provider.Web;

    @Column(nullable = false, columnDefinition = "char(1)")
    @Builder.Default
    private String bannedYn="N";



    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private List<Board> boards;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private List<Comment> comments;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private List<BrdImg> brdImgs;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private List<BanList> banLists;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private List<ProfileImg> profileImg;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private List<Manner> manners;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @ToString.Exclude
    private List<Schedule> schedules;


}
