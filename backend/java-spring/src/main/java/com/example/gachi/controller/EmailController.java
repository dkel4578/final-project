package com.example.gachi.controller;


import com.example.gachi.model.User;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.email.EmailSendService;
import com.example.gachi.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class EmailController {

    private final EmailSendService emailSendService;

    private final UserRepository userRepository;

//    @PostMapping("/email-login")
    @RequestMapping("/email-login")
    public String sendEmailLoginLink(String email
    , Model model
    , RedirectAttributes attributes){
        User user = userRepository.findByEmail("futen1998@gmail.com");

        if(user == null){
            model.addAttribute("error", "유효한 이메일 주소가 아닙니다.");

            return "user/email-login";
        }
        emailSendService.sendLoginLink(user);
        attributes.addFlashAttribute("message", "이메일 인증 메일을 발송했습니다.");

        return "redirect:/email-login";

    }
//    @PostMapping("/EmailTemplate")
////    @RequestMapping(value = "/EmailTemplate")
//    public String getArticles(Model model) {
////        List<ArticleListViewResponse> articles = blogService.findAll()
////                .stream()
////                .map(ArticleListViewResponse::new)
////                .toList();
////        model.addAttribute("articles", articles);
//
//        return "EmailTemplate";
//    }

}
