package com.example.gachi.service.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.board.AddBoardRequestDto;
import com.example.gachi.model.dto.board.BoardResponseDto;
import com.example.gachi.model.dto.board.UpdateBoardRequestDto;
import com.example.gachi.model.enums.Kind;
import com.example.gachi.repository.BoardRepository;
import com.example.gachi.repository.BoardsRepository;
import com.example.gachi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardsRepository boardsRepository;
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
//    public List<BoardResponseDto> fetchBoardPagesBy(Long lastBoardId, int size){
//        PageRequest pageRequest = PageRequest.of(0, size);
//        Page<Board> entityPage = boardsRepository.findByIdLessThanOrderByIdDesc(lastBoardId, pageRequest);
//        List<Board> entityList = entityPage.getContent();
//
//        return entityList.stream()
//                .map(BoardResponseDto::of)
//                .collect(Collectors.toList());
//    }

    public List<BoardResponseDto> fetchBoardPagesBy(Long lastBoardId, int size, int page, Kind kindValue) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<Board> entityPage = boardsRepository.findByKindOrderByCreateAtDesc(lastBoardId,kindValue, pageRequest);
        List<Board> entityList = entityPage.getContent();

        return entityList.stream()
                .map(BoardResponseDto::of)
                .collect(Collectors.toList());
    }

    public Page<Board> getBoardAll(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }
//    public List<Board> getBoardAll(){
//        return boardRepository.findAll(Sort.by("id").descending());
//    }
//    public void findAll(Pageable pageable){
//        boardRepository.findByKindOrderByIdDesc(createBoard(), pageable).map(BoardResponseDto::from);
//    }

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
