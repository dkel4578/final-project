package com.example.gachi.service.board;

import com.example.gachi.model.Board;
import com.example.gachi.model.BrdImg;
import com.example.gachi.model.Comment;
import com.example.gachi.model.User;
import com.example.gachi.model.dto.board.*;
import com.example.gachi.model.enums.Kind;
import com.example.gachi.repository.*;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardsRepository boardsRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final BrdImgRepository brdImgRepository;

    //게시판 저장
    @Transactional
//    public Board save(AddBoardRequestDto addBoardRequestDto) throws NotFoundException{
//        System.out.println("addBoardRequestDto: ---------------=>"  +  addBoardRequestDto);
//        User userEntity = userRepository.findById(addBoardRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("User not found444444"));
//        Board board = addBoardRequestDto.toEntity(userEntity);
//        return boardRepository.save(board);
//   }
    public Long save(AddBoardRequestDto addBoardRequestDto) throws NotFoundException {
        User userEntity = userRepository.findById(addBoardRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("User not found444444"));
        Board board = addBoardRequestDto.toEntity(userEntity);
        Board savedBoard = boardRepository.save(board);
        return savedBoard.getId(); // 생성된 게시글 ID 반환
    }

    //게시글 상세 정보 가져오기
    public BoardResponseDto getBoard(long id) {
        Optional<Board> boardResponseDto = boardRepository.findById(id);
//        return boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found : " + boardId));
        return BoardResponseDto.of(boardResponseDto.orElse(null));
    }

    //게시글  이미지 정보 가져오기
    public BrdImgResponseDto getBrdImg(long brdId) {
        Optional<BrdImg> brdImgResponseDto = brdImgRepository.findByBoardId(brdId);
        return BrdImgResponseDto.of(brdImgResponseDto.orElse(null));
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


//    public Page<Board> fetchBoardListWithCommentCount(
//            Kind kindValue,
//            String searchWord,
//            Pageable pageable
//    ) {
//        Page<Object[]> boardData = boardsRepository.findBoardsWithCommentCount(kindValue, searchWord, pageable);
//        List<Board> boards = new ArrayList<>();
//
//        for (Object[] row : boardData) {
//            Board board = (Board) row[0];
//            Long commentCount = (Long) row[1];
//            board.setCommentCount(commentCount.intValue()); // 댓글 수 설정
//            boards.add(board);
//        }
//
//        return new PageImpl<>(boards, pageable, boardData.getTotalElements());
//    }


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

    //게시글 조회수 카운트
    @Transactional
    public void updateCnt(Long boardId){
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found: "));
        board.updateCnt(boardId);
    }

    @Transactional
    public void recovery(Long boardId){
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("not found: "));
        board.deleteBoard("N");
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



    //댓글 저장
    @Transactional
    public Comment saveComment(AddCommentRequestDto addCommentRequestDto) throws NotFoundException{
        System.out.println("addCommentRequestDto: ---------------=>"  +  addCommentRequestDto);
        User userEntity = userRepository.findById(addCommentRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("User not found_comment_service"));
        Board boarEntity = boardRepository.findById(addCommentRequestDto.getBoardId()).orElseThrow(() -> new NotFoundException("User not found_comment_service"));
        Comment comment = addCommentRequestDto.toEntity(boarEntity, userEntity);
        return commentRepository.save(comment);
    }

    //댓글 수정하기
    @Transactional
    public Comment updateComment(Long id, UpdateCommentRequestDto updateCommentRequestDto) throws NotFoundException{
        System.out.println("updateCommentRequestDto: ---------------=>"  +  updateCommentRequestDto);
        Comment comment = commentRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("해당 댓글이 존재 하지 않습니다."));
        comment.updateComment(updateCommentRequestDto.getContent());
        return comment;
    }


    //댓글 삭제하기
    @Transactional
    public void deleteComment(Long comId){
        Comment comment = commentRepository.findById(comId).orElseThrow(() -> new IllegalArgumentException("not found: "));
        comment.deleteComment("Y");
    }


    // 댓글 목록 가져오기
    public List<CommentResponseDto> fetchCommentBy(Long boardId) {
    // 댓글을 해당 게시글(boardId)에 대한 것만 가져와야 합니다.
    List<Comment> comments = commentRepository.findByBoardIdOrderByCreateAtDesc(boardId);

    return comments.stream()
            .map(CommentResponseDto::of)
            .collect(Collectors.toList());
    }



}
