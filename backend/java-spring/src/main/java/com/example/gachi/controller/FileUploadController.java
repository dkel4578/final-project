package com.example.gachi.controller;

import com.example.gachi.model.ProfileImg;
import com.example.gachi.model.User;
import com.example.gachi.repository.ProfileImgRepository;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/upload")
public class FileUploadController {

    private final FileUploadService fileUploadService;
    private final UserRepository userRepository;
    private final ProfileImgRepository profileImgRepository;


    @PostMapping("/profileImg")
    public ResponseEntity<String> uploadProfileImg(@RequestParam("file") MultipartFile file, @RequestParam("userId") long id){
        try{

        if(file.isEmpty()){
            return ResponseEntity.ok("");
        }

            String orgName = file.getOriginalFilename();
            UUID uuid = UUID.randomUUID();
            String imgName = uuid+"_"+orgName;
            String path = "c:\\img";
            String uploadpath = path;
            String path2 = System.getProperty("user.dir");
            String path3 = "\\src\\main\\resources\\image\\profileImg\\";
            String imgSrc = path2+path3+imgName;

            Optional<User> user =  userRepository.findById(id);

            ProfileImg newProfileImg = ProfileImg.builder()
                    .imgSrc(imgSrc)
                    .orgName(orgName)
                    .imgName(imgName)
                    .user(user.orElse(null))
                    .build();

            fileUploadService.profileImgUpload(newProfileImg);

            File destFile = new File(imgSrc);
            file.transferTo(destFile);

            profileImgRepository.save(newProfileImg);

            return ResponseEntity.ok("파일 업로드 및 저장 성공");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
        }
    }



}
