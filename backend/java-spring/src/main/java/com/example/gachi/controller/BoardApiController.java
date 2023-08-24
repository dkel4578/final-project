package com.example.gachi.controller;

import com.example.gachi.model.dto.board.*;
import com.example.gachi.model.enums.Kind;
import com.example.gachi.repository.CommentRepository;
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
    private CommentRepository commentRepository;

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

    //게실글 입력
    @PostMapping("/board/insert")
    public ResponseEntity<String> addBoard(@RequestBody AddBoardRequestDto addBoardRequestDto)  throws NotFoundException {
        System.out.println("===================="+addBoardRequestDto);
//        User userEntity = userRepository.findById(addBoardRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("User not found222222"));
        boardService.save(addBoardRequestDto);   // 글 저장
        return ResponseEntity.status(HttpStatus.CREATED).body("게시글 등록 성공");

    }

    //게시글 수정
    @PutMapping("/board/edit/{id}")
    public void update(@PathVariable Long id, @RequestBody UpdateBoardRequestDto updateBoardRequestDto){
        System.out.println("===================="+updateBoardRequestDto);
        boardService.update(id, updateBoardRequestDto); //글 수정
    }

    //게시글 삭제
    @PutMapping("/board/delete/{id}")
    public void delete(@PathVariable Long id){
        System.out.println("===================="+id);
        boardService.delete(id); //글 삭제
    }
    @PutMapping("/board/recovery/{id}")
    public void recovery(@PathVariable Long id){
        System.out.println("===================="+id);
        boardService.recovery(id); //글 삭제
    }

    //댓글 입력
    @PostMapping("/comment/insert")
    public ResponseEntity<String> addComment(@RequestBody AddCommentRequestDto addCommentRequestDto)  throws NotFoundException {
        System.out.println("===================="+addCommentRequestDto);
        boardService.saveComment(addCommentRequestDto);   // 댓글 저장
        return ResponseEntity.status(HttpStatus.CREATED).body("댓글 등록 성공");
    }

    //댓글 수정
    @PutMapping("/comment/update/{commentId}")
    public void updateComment(@PathVariable Long commentId, @RequestBody UpdateCommentRequestDto updateCommentRequestDto)  throws NotFoundException {
        System.out.println("===================="+updateCommentRequestDto + " / " + commentId);
        boardService.updateComment(commentId, updateCommentRequestDto);   // 댓글 수정
    }

    //댓글 삭제
    @PutMapping("/comment/delete/{comId}")
    public void deleteComment(@PathVariable Long comId){
        System.out.println("===================="+comId);
        boardService.deleteComment(comId); //글 삭제
    }

    //댓글 가져오기
//    @GetMapping("/comment/list/{id}")
//    public List<CommentResponseDto> getCommentLowerThanId(
//            @RequestBody Map<String, Object> requestPayload
//    ) {
//        Long boardId = Long.parseLong(requestPayload.get("id").toString());
//        List<CommentResponseDto> listCommentResponseDto = boardService.fetchCommentBy(boardId);
//        return listCommentResponseDto;
//    }

    @GetMapping("/comment/list/{id}")
    public List<CommentResponseDto> getCommentsByBoardId(@PathVariable Long id) {
        // 여기에서 id 변수는 요청 URL의 경로 변수 {id}에 매핑됩니다.
        // 이제 id 변수를 사용하여 필요한 작업을 수행할 수 있습니다.
        // 예: id를 이용한 댓글 데이터 조회
        Long boardId = id;
        List<CommentResponseDto> comments = boardService.fetchCommentBy(boardId);
        return comments;
    }


}

