package com.example.gachi.service.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.board.AddBoardRequestDto;
import com.example.gachi.model.dto.board.UpdateBoardRequestDto;
import com.example.gachi.repository.BoardRepository;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    //게시판 저장
    public Board save(AddBoardRequestDto addBoardRequestDto) throws NotFoundException{
        System.out.println("addBoardRequestDto: ---------------=>"  +  addBoardRequestDto);
        User userEntity = userRepository.findByEmail(addBoardRequestDto.getEmail()).orElseThrow(() -> new NotFoundException("User not found444444"));
        return boardRepository.save(addBoardRequestDto.toEntity(userEntity.getId()));
    }

    //글 상세 정보 가져오기
    public Board getBoard(long boardId) {
        return boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found : " + boardId));
    }

    //글 목록 가져오기
    public List<Board> getBoardAll(){
        return boardRepository.findAll();
    }

    //글 삭제하기
    public void delete(long boardId){
        boardRepository.deleteById(boardId);
    }

    //글 수정하기
    @Transactional
    public Board update(long boardId, UpdateBoardRequestDto updateBoardRequestDto){
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found: "));
        board.update(updateBoardRequestDto.getTitle(), updateBoardRequestDto.getContent());
        return board;

    }

}
