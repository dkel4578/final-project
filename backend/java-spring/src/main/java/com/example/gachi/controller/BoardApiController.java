package com.example.gachi.controller;

import com.example.gachi.model.dto.board.BoardResponseDto;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardApiController {

    private final BoardService boardService;

    @GetMapping("/boardss")
    public List<BoardResponseDto> getBoardLowerThanId(@RequestParam Long lastBoardId, @RequestParam int size){
        return boardService.fetchBoardPagesBy(lastBoardId, size);
    }
}
