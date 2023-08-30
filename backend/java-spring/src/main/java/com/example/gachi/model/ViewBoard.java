package com.example.gachi.model;

import com.example.gachi.model.enums.Kind;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import net.jcip.annotations.Immutable;

import java.time.LocalDateTime;

@Getter
@Immutable
@Entity
public class ViewBoard extends BaseEntity{
    @Id
    private Long id;
    private Kind kind; //커뮤니티 종류 C:커피, F: 식사, A: 술한잔, T: 여행
    private String title; //제목
    private String content; // 내용
    private int cnt; // 조회수
    private String delYn; // 삭제여부
    private Long userId;  // 작성자
    private int commentCount; // 댓글 수를 저장할 필드 추가
    private String localPlace; // 만남장소 필드 추가
    private String localAddress; // 만남주소 필드 추가
    private double latitude; //위도
    private double longitude; //경도
//    private LocalDateTime createAt; // 입력일
//    private LocalDateTime updateAt; // 수정일
    private String nickname; // 작성자 닉네임
}
