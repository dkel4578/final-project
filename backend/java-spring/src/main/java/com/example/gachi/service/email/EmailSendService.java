package com.example.gachi.service.email;

import com.example.gachi.model.EmailMessage;
import com.example.gachi.model.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Component
@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class EmailSendService {
    private static final String EXAMPLE_LINK_TEMPLATE = "/EmailTemplate";

    private final TemplateEngine templateEngine;

    private final EmailService emailService;

    public void sendLoginLink(User user) {
        Context context = getContext(user);
        String message = templateEngine.process(EXAMPLE_LINK_TEMPLATE, context);

        EmailMessage emailMessage = EmailMessage.builder()
                .to(user.getEmail())
                .subject(user.getName()+ " 님 안녕하세요.")
                .message(message)
                .build();

        emailService.send(emailMessage);
    }

    private Context getContext(User user) {
        Context context = new Context();
        context.setVariable("name", user.getName());
        context.setVariable("message", user.getName()+"님의 비밀번호는 " + user.getPassword()+ " 입니다.");

        return context;
    }
}
