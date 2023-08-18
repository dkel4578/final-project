package com.example.gachi.controller;

import com.example.gachi.model.Board;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.board.AddBoardRequestDto;
import com.example.gachi.model.dto.board.BoardResponseDto;
import com.example.gachi.model.dto.board.ReportResponseDto;
import com.example.gachi.model.enums.Kind;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.board.BoardService;
import lombok.RequiredArgsConstructor;


import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardApiController {
    @Autowired
    private final BoardService boardService;
    @Autowired
    private final UserRepository userRepository;

    //커뮤니티 가져오기 (검색 포함)
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


    //커뮤니티 게시글 입력
//    @PostMapping("/board/input")
//    public ResponseEntity<BoardResponseDto> save(@RequestBody AddBoardRequestDto requestDto) {
//        return ResponseEntity.ok(boardService.save(requestDto));
//    }

    @PostMapping("/board/insert")
    public ResponseEntity<String> addBoard(@RequestBody AddBoardRequestDto addBoardRequestDto)  throws NotFoundException {
        System.out.println("===================="+addBoardRequestDto);
//        User userEntity = userRepository.findById(addBoardRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("User not found222222"));
        boardService.save(addBoardRequestDto);   // 글 저장
        return ResponseEntity.status(HttpStatus.CREATED).body("게시글 등록 성공");

    }

}
