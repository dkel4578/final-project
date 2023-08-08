package com.example.gachi.controller;


import com.example.gachi.model.User;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.email.EmailSendService;
import com.example.gachi.service.email.EmailService;
import com.example.gachi.util.RedisUtil;
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
@RequestMapping("/api")
@RequiredArgsConstructor
public class EmailController {

    private final EmailSendService emailSendService;

    private final UserRepository userRepository;

    private RedisUtil redisUtil;


//    @PostMapping("/email-login")
    @RequestMapping("/email-login")
    public String sendEmailLoginLink(String email
    , Model model
    , RedirectAttributes attributes){
//        User user = userRepository.findByEmail(email);

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // 이제 user 객체를 사용할 수 있습니다.
            emailSendService.sendLoginLink(user);
            attributes.addFlashAttribute("message", "이메일 인증 메일을 발송했습니다.");


            attributes.addFlashAttribute("name",user.getName());
            attributes.addFlashAttribute("email",user.getEmail());

            return "redirect:/email-login";
        } else {
            // 해당 이메일로 등록된 사용자가 없는 경우 처리
            model.addAttribute("error", "유효한 이메일 주소가 아닙니다.");
//            System.out.println(model);

            return "user/email-login";
        }


//        if(user == null){
//            model.addAttribute("error", "유효한 이메일 주소가 아닙니다.");
//
//            return "user/email-login";
//        }
//        emailSendService.sendLoginLink(user);
//        attributes.addFlashAttribute("message", "이메일 인증 메일을 발송했습니다.");
//
//
//        attributes.addFlashAttribute("name",user.getName());
//        attributes.addFlashAttribute("email",user.getEmail());
//
//        return "redirect:/email-login";

    }
    @RequestMapping("/email-cert")
    public String sendEmailJoinLink(String email
            , Model model
            , RedirectAttributes attributes
            , String name){
        User user = userRepository.findByEmail(email);

        if(user != null){
            model.addAttribute("error", "이메일이 이미 존재합니다.");

            return "user/email-login";
        }
        emailSendService.sendJoinLink(email,name);
        attributes.addFlashAttribute("message", "이메일 인증 메일을 발송했습니다.");




        attributes.addFlashAttribute("name",name);
        attributes.addFlashAttribute("email",email);

        return "redirect:/email-login";

    }

    @RequestMapping("/certAuth")
    public String checkCode(String email){

        String code = redisUtil.getData(email);
        if (code != null){

            return code;
        }
        else{

            return "유효기간이 만료되었거나 일치하지 않습니다.";
        }
    }



}
