package com.example.gachi.model.dto.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class RefreshTokenDto {
    @Id
    private String refreshToken;
    private Long tokenExpiresIn;
    private String grantType;
}
