package com.example.gachi.model;

import com.example.gachi.model.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notification extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private String url;

    @Enumerated(value = EnumType.STRING)
    private NotificationType notificationType;

    @Column(nullable = false)
    private Boolean isRead = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private User receiver;

    @Builder
    public Notification(User receiver, String content, String url, NotificationType notificationType, Boolean isRead) {
        this.receiver = receiver;
        this.content = content;
        this.url = url;
        this.notificationType = notificationType;
        this.isRead = isRead;
    }

}
