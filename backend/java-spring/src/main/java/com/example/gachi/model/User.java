package com.example.gachi.model;
import com.example.gachi.model.enums.Authority;
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
@EqualsAndHashCode(callSuper=false)
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


    private Long accessTokenExpireIn;

    private String refreshToken;

    private Long refreshTokenExpireIn;


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


    @Enumerated(value = EnumType.STRING)
    private Authority authority;

    @Column(nullable = false)
    @Builder.Default
//    @Enumerated(value = EnumType.STRING)
//    private Provider provider= Provider.Web;
    private String provider = "Web";

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

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "reported_id")
    @ToString.Exclude
    private List<Report> reports;


    public User update(
            String  accessToken,
            Long accessTokenExpireIn,
            String loginId,
            String refreshToken,
            Long refreshTokenExpireIn
    ){
        this.accessToken = accessToken;
        this.accessTokenExpireIn = accessTokenExpireIn;
        this.loginId = loginId;
        this.refreshToken = refreshToken;
        this.refreshTokenExpireIn = refreshTokenExpireIn;
        return this;
    }

    public User update(String loginId){
        this.loginId = loginId;
        return this;
    }

    public void updateUser(String name,
                           String phone,
                           String email,
                           String gender,
                           String nickname,
                           String profileMessage,
                           LocalDate birth){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.nickname = nickname;
        this.profileMessage = profileMessage;
        this.birth = birth;
    }

    public void updatePassword(String password){
        this.password = password;
    }

    public List<BanList> getBanLists() {
        return this.banLists;
    }



}
