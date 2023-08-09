package com.example.gachi.controller;


import com.example.gachi.model.User;
import com.example.gachi.repository.UserRepository;
import com.example.gachi.service.email.EmailSendService;
import com.example.gachi.service.email.EmailService;
import com.example.gachi.util.RedisUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.net.http.HttpResponse;
import java.util.Optional;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class EmailController {

    private final EmailSendService emailSendService;

    private final UserRepository userRepository;

    private final RedisUtil redisUtil;


//    @PostMapping("/email-login")
    @RequestMapping("/email-login")
    public String sendEmailLoginLink(String email
    , Model model
    , RedirectAttributes attributes){
        Optional<User> userOptional = userRepository.findByEmail(email);

        if(!userOptional.isPresent()){
            model.addAttribute("error", "유효한 이메일 주소가 아닙니다.");
//            System.out.println(model);

            return "user/email-login";
        }else{
            User user = userOptional.get();
            emailSendService.sendLoginLink(user);
            attributes.addFlashAttribute("message", "이메일 인증 메일을 발송했습니다.");


            attributes.addFlashAttribute("name",user.getName());
            attributes.addFlashAttribute("email",user.getEmail());

            return "redirect:/email-login";
        }
    }
    @RequestMapping("/find-id")
    public String sendFindIdLink(String email
    , Model model
    , RedirectAttributes attributes){
        Optional<User> userOptional = userRepository.findByEmail(email);


        if(!userOptional.isPresent()){
            model.addAttribute("error", "유효한 이메일 주소가 아닙니다.");
//            System.out.println(model);

            return "user/email-login";
        }
        User user = userOptional.get();
        emailSendService.sendFindIdEmail(user);
        attributes.addFlashAttribute("message", "이메일 인증 메일을 발송했습니다.");



        attributes.addFlashAttribute("name",user.getName());
        attributes.addFlashAttribute("email",user.getEmail());


        return "redirect:/findId";

    }


//    @ResponseBody, @RequestBody
//    DTO https://magpienote.tistory.com/36
    @CrossOrigin(origins = "*")
    @GetMapping("/checkCode")
    public void checkCode(String code
            , String email
            , Model model
//            , RedirectAttributes attributes
            , HttpServletResponse response
            , HttpServletRequest request
    ){
        System.out.println("code: " + code);
        System.out.println("email: " + email);
        System.out.println("check :"+redisUtil.getData(email));

        JSONObject jsonObject = new JSONObject();
        boolean check;

        if(!code.equals(redisUtil.getData(email))){
//            attributes.addFlashAttribute("status",false);
            check = false;
            System.out.println("false");

        }else{
//            attributes.addFlashAttribute("status",true);
            System.out.println("true");
            check = true;
        }

        jsonObject.put("check",check);

        try {
            response.getWriter().print(jsonObject);	//response.getWriter로 프린트 해주면 통신 성공
        } catch (Exception e) {
            e.printStackTrace();
        }

//        return "redirect://locahost:3000/findId";
    }





    @RequestMapping("/email-cert")
    public String sendEmailJoinLink(String email
            , Model model
            , RedirectAttributes attributes
            , String name){
        Optional<User> user = userRepository.findByEmail(email);

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
