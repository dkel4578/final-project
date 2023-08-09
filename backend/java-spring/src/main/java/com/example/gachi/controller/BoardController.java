package com.example.gachi.controller;

import com.example.gachi.model.Board;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.board.AddBoardRequestDto;
import com.example.gachi.model.dto.board.BoardListViewResponseDto;
import com.example.gachi.model.dto.board.BoardResponseDto;
import com.example.gachi.repository.BoardRepository;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardController {
    @Autowired
    private BoardService boardService;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private final UserRepository userRepository;

    private String email;

    @GetMapping("/gettest1")
    public ResponseEntity<String> gettest1() {
        return ResponseEntity.ok("get성공보여짐");
    }

    @GetMapping("/posttest1")
    public ResponseEntity<String> posttest1() {
        return ResponseEntity.ok("post성공보여짐");
    }

    /**
     * Desc: 게시글 등록 api
     * @param request
     * @return
     */
    @PostMapping("/boards2")
    public ResponseEntity<Board> addBoard(@RequestBody AddBoardRequestDto request)  throws NotFoundException {
//        System.out.println("===================="+request.getEmail());
//        User userEntity = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("User not found222222"));
        Board savedBoard = boardService.save(request);   // 글 저장

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBoard);
    }



    //상세글 가져오기
    @GetMapping("/api/boards/{id}")
    public ResponseEntity<BoardResponseDto> findboards(@PathVariable long id) {
        Board board = boardService.getBoard(id);
        return ResponseEntity.ok().body(new BoardResponseDto(board));
    }

//    @GetMapping("/api/boards")
//    public ResponseEntity<List<BoardResponseDto>> findAllBoards() {
//        List<Board> boardList = boardService.getBoardAll();
//
//        // stream을 이용한 방식
//        List<BoardResponseDto> boardResponseList = boardList.stream()
//                .map(BoardResponseDto::new)
//                .toList();
//        // 옛날에 쓰던 방식
////        List<BoardResponseDto> boardResponseList = new ArrayList<>();
////        for (Board board : boardList) {
////            BoardResponseDto boardResponseDto = new BoardResponseDto(board);
////            boardResponseList.add(boardResponseDto);
////        }
//
//        //id 내림차순으로 변경
//        Collections.sort(boardResponseList,
//                Comparator.comparingLong(BoardResponseDto::getId).reversed());
//
////        return ResponseEntity.status(HttpStatus.OK)
//        return ResponseEntity.ok().body(boardResponseList);
//    }

    //전체글 가져오기 (게시판 페이징)
    @GetMapping("/boards")
    public ResponseEntity retrieveBoards(final Pageable pageable) {
        Page<Board> boards = boardRepository.findAll(pageable);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

}
