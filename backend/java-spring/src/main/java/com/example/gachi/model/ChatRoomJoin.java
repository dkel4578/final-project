package com.example.gachi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomJoin extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name =  "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonBackReference
    private ChatRoom chatRoom;

    @Column(columnDefinition = "char(1)")
    @Builder.Default
    private String bannedYn = "N";

    public ChatRoomJoin(User user, ChatRoom chatRoom){
        this.user = user;
        this.chatRoom = chatRoom;
    }
}
