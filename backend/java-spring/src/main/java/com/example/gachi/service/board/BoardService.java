package com.example.gachi.service.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.board.AddBoardRequestDto;
import com.example.gachi.model.dto.board.BoardResponseDto;
import com.example.gachi.model.dto.board.DeleteBoardRequestDto;
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
        User userEntity = userRepository.findById(addBoardRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("User not found444444"));
        Board board = addBoardRequestDto.toEntity(userEntity);
        return boardRepository.save(board);
   }

    //글 상세 정보 가져오기
    public Board getBoard(long boardId) {
        return boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found : " + boardId));
    }


    //게시글 목록 가져오기 (검색 포함)
    public List<BoardResponseDto> fetchBoardPagesBy(
            Long lastBoardId,
            int size,
            int page,
            Kind kindValue,
            String searchWord) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Board> entityPage;

        //검색어가 있다면
        if (searchWord != null && !searchWord.isEmpty()) {
            entityPage = boardsRepository.findByKindAndTitleContainingOrderByCreateAtDesc(
                    kindValue,
                    searchWord,
                    pageRequest
            );
        } else {//검색어가 없다면
            entityPage = boardsRepository.findByKindOrderByCreateAtDesc(
                    lastBoardId,
                    kindValue,
                    pageRequest
            );
        }

        List<Board> entityList = entityPage.getContent();

        return entityList.stream()
                .map(BoardResponseDto::of)
                .collect(Collectors.toList());
    }

    //    public List<BoardResponseDto> fetchBoardPagesBy(Long lastBoardId, int size){
//        PageRequest pageRequest = PageRequest.of(0, size);
//        Page<Board> entityPage = boardsRepository.findByIdLessThanOrderByIdDesc(lastBoardId, pageRequest);
//        List<Board> entityList = entityPage.getContent();
//
//        return entityList.stream()
//                .map(BoardResponseDto::of)
//                .collect(Collectors.toList());
//    }





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
    @Transactional
    public void delete(Long boardId){
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found: "));
        board.deleteBoard("Y");
    }
//    public void delete(Long boardId){
//        System.out.println("delete: id" + boardId);
//        boardRepository.deleteById(boardId);
//    }


    //글 수정하기
    @Transactional
    public Board update(Long boardId, UpdateBoardRequestDto updateBoardRequestDto){
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found: "));
        board.updateBoard(updateBoardRequestDto.getTitle(), updateBoardRequestDto.getContent());
        return board;
    }

}
