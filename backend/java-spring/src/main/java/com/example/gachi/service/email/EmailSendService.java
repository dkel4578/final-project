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
                .subject("이메일 제목")
                .message(message)
                .build();

        emailService.send(emailMessage);
    }

    private Context getContext(User user) {
        Context context = new Context();
        context.setVariable("message", "메일 메시지");

        return context;
    }
}
