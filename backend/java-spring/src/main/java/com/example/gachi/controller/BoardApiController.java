package com.example.gachi.controller;

import com.example.gachi.model.dto.board.BoardResponseDto;
import com.example.gachi.model.enums.Kind;
import com.example.gachi.service.board.BoardService;
import lombok.RequiredArgsConstructor;




import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardApiController {

    private final BoardService boardService;

    @PostMapping("/boardss")
    public List<BoardResponseDto> getBoardLowerThanId(
            @RequestBody Map<String, Object> requestPayload
    ) {
        Long lastBoardId = Long.parseLong(requestPayload.get("lastBoardId").toString());
        int size = Integer.parseInt(requestPayload.get("size").toString());
        int page = Integer.parseInt(requestPayload.get("page").toString());
        Kind kind = Kind.valueOf((String) requestPayload.get("kind"));
        String searchWord = (String) requestPayload.get("searchWord");

        List<BoardResponseDto> listBoardResponseDto = boardService.fetchBoardPagesBy(
                lastBoardId,
                size,
                page,
                kind,
                searchWord
        );
        return listBoardResponseDto;
    }

}
