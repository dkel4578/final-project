package com.example.gachi.controller;


import com.example.gachi.model.User;
import com.example.gachi.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

//    private final UserRepository userRepository;

    @PostMapping("/email-login")
    public String sendEmailLoginLink(String email
    , Model model
    , RedirectAttributes attributes){
        User user = userRepository.findByEmail(email);

        if(user == null){
            model.addAttribute("error", "유효한 이메일 주소가 아닙니다.");

            return "user/email-login";
        }
        emailService.sendLoginLink(user);
        attributes.addFlashAttribute("message", "이메일 인증 메일을 발송했습니다.");

        return "redirect:/email-login";

    }

}
