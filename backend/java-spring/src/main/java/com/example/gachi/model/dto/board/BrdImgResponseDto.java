package com.example.gachi.model.dto.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.BrdImg;
import com.example.gachi.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrdImgResponseDto {
    private Long id;
    private String imgSrc;
    private String imgName;
    private String orgName;
    private User user;
    private Long userId;
    private Board board;
    private Long boardId;


    public static BrdImgResponseDto of(BrdImg brdImg){
        return BrdImgResponseDto.builder()
                .id(brdImg.getId())
                .imgSrc(brdImg.getImgSrc())
                .orgName(brdImg.getOrgName())
                .imgName(brdImg.getImgName())
                .userId(brdImg.getUser().getId())
                .boardId(brdImg.getBoard().getId())
                .build();
    }
}
