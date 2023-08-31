package com.example.gachi.controller;

import com.example.gachi.model.Board;
import com.example.gachi.model.BrdImg;
import com.example.gachi.model.User;
import com.example.gachi.repository.BoardsRepository;
import com.example.gachi.repository.BrdImgRepository;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.board.BoardFileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BoardFileUploadController {

    private final BoardFileUploadService boardFileUploadService;
    private final UserRepository userRepository;
    private final BrdImgRepository brdImgRepository;
    private final BoardsRepository boardsRepository;


    @PostMapping("/board/boardImg")
    public ResponseEntity<String> uploadBrdImg(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") long id,
            @RequestParam("brdId") long brdid){
        try{

        if(file.isEmpty()){
            return ResponseEntity.badRequest().body("업로드할 파일이 존재하지 않습니다.");
        }

            String orgName = file.getOriginalFilename();
            UUID uuid = UUID.randomUUID();
            String imgName = uuid+"_"+orgName;
//            String imgSrc = "D:\\cloud-course\\final-project\\frontend\\public\\boardImg\\"+imgName;
            String path2 = System.getProperty("user.dir");
            String path3 = "\\src\\main\\resources\\image\\boardImg\\";
            String imgSrc = path2+path3+imgName;
            Optional<User> user =  userRepository.findById(id);
            Optional<Board> board =  boardsRepository.findById(brdid);


            BrdImg newBrdImg = BrdImg.builder()
                    .imgSrc(imgSrc)
                    .orgName(orgName)
                    .imgName(imgName)
                    .user(user.orElse(null))
                    .board(board.orElse(null))
                    .build();

            boardFileUploadService.brdImgUpload(newBrdImg);


            File destFile = new File(imgSrc);
            file.transferTo(destFile);

            brdImgRepository.save(newBrdImg);

            return ResponseEntity.ok("파일 업로드 및 저장 성공");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
        }
    }



}
