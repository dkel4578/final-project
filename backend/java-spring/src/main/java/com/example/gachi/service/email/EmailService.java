package com.example.gachi.service.email;


import com.example.gachi.model.EmailMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.util.Random;

@Slf4j
//@Profile("test")
@Component
@RequiredArgsConstructor
public class EmailService  {
    private final JavaMailSender javaMailSender;

public void send(EmailMessage emailMessage){
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();

    try{
//        첨부파일(Multipartfile) 보낼꺼면 TRUE
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false ,"UTF-8");
        mimeMessageHelper.setTo(emailMessage.getTo());
        mimeMessageHelper.setSubject(emailMessage.getSubject());
        /*
        html 템플릿이면 true
        plaintext면 false 세양이 형이 html 만들어줄거니까 true
        */


        mimeMessageHelper.setText(emailMessage.getMessage(),true);

        javaMailSender.send(mimeMessage);
        log.info("send Email : {}", emailMessage.getMessage());
        }catch (MessagingException e){
            log.error("[EmailServive.send()] error {}", e.getMessage());
        }

    }

}


