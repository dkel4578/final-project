package com.example.gachi.service.email;

import com.example.gachi.model.EmailMessage;
import com.example.gachi.model.User;
import com.example.gachi.util.RedisUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Random;


@Component
@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class EmailSendService {
    private static final String EMAIL_LINK_TEMPLATE = "/EmailTemplate";
    private static final String EMAIL_LINK_CODE = "/EmailCode";
    private static final String EMAIL_LINK_NEW = "/NewUserEmail";

    private final TemplateEngine templateEngine;

    private final EmailService emailService;

    private final RedisUtil redisUtil;

    private String accessCode = createKey();

    public void sendFindIdEmail(User user,String type){
        accessCode = createKey();
        Context context = getContext(user,type);
        String message = templateEngine.process(EMAIL_LINK_CODE, context);

        redisUtil.setDataExpire(user.getEmail(), accessCode, 300 * 1L);

        if (type.equals("P")){
            EmailMessage emailMessage = EmailMessage.builder()
                    .to(user.getEmail())
                    .subject(user.getName()+ " 님 안녕하세요.")
                    .message(message)
                    .code("비밀번호 변경 인증")
                    .build();
            emailService.send(emailMessage);
        }else{
            EmailMessage emailMessage = EmailMessage.builder()
                    .to(user.getEmail())
                    .subject(user.getName()+ " 님 안녕하세요.")
                    .message(message)
                    .code("아이디 찾기 인증")
                    .build();
            emailService.send(emailMessage);
        }




    }


    public void sendLoginLink(User user) {
        accessCode = createKey();
        Context context = getContext(user);
        String message = templateEngine.process(EMAIL_LINK_TEMPLATE, context);
//        redisUtil.setDataExpire(accessCode, to, 60 * 1L);

        EmailMessage emailMessage = EmailMessage.builder()
                .to(user.getEmail())
                .subject(user.getName()+ " 님 안녕하세요.")
                .message(message)
                .build();

        emailService.send(emailMessage);
    }public void sendJoinLink(String email) {
        accessCode = createKey();
        Context context = getContext();
        String message = templateEngine.process(EMAIL_LINK_NEW, context);
        redisUtil.setDataExpire(email, accessCode, 300 * 1L);

        EmailMessage emailMessage = EmailMessage.builder()
                .to(email)
                .subject("신규 회원님의 가입을 축하합니다!")
                .message(message)
                .build();

        emailService.send(emailMessage);
    }

    private Context getContext(User user) {
        Context context = new Context();
        context.setVariable("name", user.getName());
        context.setVariable("message", user.getName()+"님의 인증 코드는 " + accessCode + " 입니다.");

        return context;
    }
    private Context getContext(User user,String type) {
        Context context = new Context();
        context.setVariable("name", user.getName());
        if(type.equals("P")){
            context.setVariable("code", "비밀번호 변경 인증");
        }else{
            context.setVariable("code", "아이디 찾기 인증");
        }
        context.setVariable("message", "인증 코드는 " + accessCode + " 입니다.");

        return context;
    }
    private Context getContext(String name) {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("message", name + " 님의 인증 코드는 " + accessCode + " 입니다.");

        return context;
    }
    private Context getContext() {
        Context context = new Context();
        context.setVariable("message","신규 회원님의 인증 코드는 " + accessCode + " 입니다.");

        return context;
    }


    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }


}
