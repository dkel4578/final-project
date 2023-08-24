package com.example.gachi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(callSuper=false)
public class ProfileImg extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String imgSrc;

    @Column(nullable=false)
    private String imgName;

    @Column(nullable=false)
    private String orgName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User user;
}
