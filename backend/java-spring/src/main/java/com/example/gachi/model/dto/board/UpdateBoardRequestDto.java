package com.example.gachi.model.dto.board;

import lombok.Data;

@Data
public class UpdateBoardRequestDto {
    private String title;
    private String content;
    private String localPlace;
    private String localAddress;
    private Double latitude;
    private Double longitude;


    public UpdateBoardRequestDto(
            String title,
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
}
