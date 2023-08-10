import $ from 'jquery';
import Swal from "sweetalert2";
/* 헤더 인클루드 */
$(function(){
  $('.header-include').load('../html/header.html',function(){
  })
})

/* 헤더 사이드바 커뮤니티 슬라이드 업다운 */
$(function(){
  $('.category-comu').click(function(){
    $(this).nextAll('.category-sub').stop().slideToggle(1000);
  })
})

/* 푸터 인클루드 */
$(function(){
  $('.footer-include').load('../html/footer.html')
})

/* 슬라이더 섹션 슬라이딩*/
// $(function(){
//   $('.slide-items').slick({
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     adaptiveHeight: true,
//     autoplay:true,
//     autoplaySpeed: 1500
//   })
// })

/* faq 타이틀 클릭 */
$(function(){
  // $('.faq-title').click(function(){
  //   $(this).toggleClass('active');
  //   $(this).siblings('.faq-title').removeClass('active');
  //   $(this).next('.faq-content').stop().slideToggle();
  //   let accodionImg = $(this).attr('data-faq');
  //   $('.' + accodionImg).addClass('active');
  //   $('.' + accodionImg).siblings().removeClass('active');
  // })
})

/* faq 타이틀 클릭-2 */
$(function(){
  $('.faq-title').click(function(){
    $(this).toggleClass('active');
    $(this).siblings('.faq-content').stop().slideToggle();  
  })
})

/* 게시판 카테고리 활성화시 폰트 볼드 */
$(function(){
  $('.board-kind a').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
  })
})

/* 비밀번호 잊었나요? 클릭시 모달 */
$(function(){
  $('.forgot-password').click(function(){
    console.log('dd')
    $('.find-password-modal').addClass('active')
  })
})
/* 클릭시 모달 닫기 */
$(function(){
  $('.find-password-modal fieldset .fa').click(function(){
    $('.find-password-modal').removeClass('active')
  })
})

/* 게시판 페이징 색상변경 */
$(function(){
  $('.paging-ball').click(function(){
    $(this).addClass('active');
    $(this).siblings('.paging-ball').removeClass('active');
  })
})


/* 인증번호 없이 비밀번호 변경 클릭시 */
$(document).ready(function() {
  // 버튼 클릭 시 이벤트 처리
  $(".password-change-btn a").click(function() {
    // 인증번호 입력값 가져오기
    var cfNumberInput = $(".cf-number-input-text").val().trim();
    // 인증번호가 빈 값인 경우
    if (cfNumberInput === "") {
      // SweetAlert 팝업 창 띄우기
      Swal.fire({
        title: "알림",
        text: "인증을 완료해주십시오",
        width: 360 // 폭을 원하는 값으로 조정 (단위: px)
      });
    } else if(cfNumberInput !== $('.cf-number-input-text').value){
      Swal.fire({
        title: "알림",
        text: "인증 번호를 다시 확인해주세요",
        width: 360 // 폭을 원하는 값으로 조정 (단위: px)
      });
    }
  });
});

/* password-change-complete페이지 */

/* 비밀번호 입력시 정규식 충족하면 아래 색 바뀌게 */
$(document).ready(function() {
  // 비밀번호 입력 요소
  var passwordInput = $(".input-pw input[type=password]");

  // 비밀번호 입력 시 이벤트 처리
  passwordInput.on("input", function() {
    var password = $(this).val();

    // 영어 대/소문자, 숫자, 특수문자 포함 여부 체크
    var hasLowerCase = /[a-z]/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);
    var hasNumber = /[0-9]/.test(password);
    var hasSpecialChar = /[!@#$%^&*]/.test(password);

    // 비밀번호 길이 체크
    var isLengthValid = password.length >= 8;

    // 모든 조건을 만족하는 경우
    if (hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && isLengthValid) {
      $(".input-pw-text").css("color", "#2ECC71"); // 초록색으로 변경
      $(".input-pw-text").text("영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리 이상의 조합입니다!");
    } else {
      $(".input-pw-text").css("color", ""); // 원래 색상으로 변경
      $(".input-pw-text").text("영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리 이상의 조합이어야 합니다!");
    }
  });
});

/* 비밀번호 창과 비밀번호 확인 창이 같으면 아래 글씨 색 변경 */
$(document).ready(function() {
  // 비밀번호 입력 요소
  var passwordInput = $(".input-pw input[type=password]");
  var passwordCheckInput = $(".input-pw-check input[type=password]");
  var passwordCheckText = $(".input-pw-check-text");

  // 비밀번호 입력 시 이벤트 처리
  passwordInput.on("input", checkPasswords);
  passwordCheckInput.on("input", checkPasswords);

  function checkPasswords() {
    var password = passwordInput.val();
    var passwordCheck = passwordCheckInput.val();

    // 하나 이상의 비밀번호 입력 값이 빈 경우
    if (password === "" || passwordCheck === "") {
      passwordCheckText.css("color", "red"); // 빨간색으로 변경
      passwordCheckText.text("비밀번호를 입력해주세요!");
    } else if (password === passwordCheck) { // 비밀번호가 비밀번호 확인과 일치할 경우
      passwordCheckText.css("color", "#2ECC71"); // 초록색으로 변경
      passwordCheckText.text("비밀번호가 일치합니다!");
    } else { // 비밀번호가 일치하지 않을 경우
      passwordCheckText.css("color", "red"); // 빨간색으로 변경
      passwordCheckText.text("비밀번호가 일치하지 않습니다!");
    }
  }
});

/* 조건에 충족하지않았을때 비밀번호 변경 버튼을 누를경우*/
$(document).ready(function() {
  // 비밀번호 입력 요소
  var passwordInput = $(".input-pw input[type=password]");
  var passwordCheckInput = $(".input-pw-check input[type=password]");
  var passwordCheckText = $(".input-pw-check-text");
  var changePasswordButton = $(".password-change-complete-btn a");

  // 비밀번호 입력 시 이벤트 처리
  passwordInput.on("input", checkPasswords);
  passwordCheckInput.on("input", checkPasswords);
  changePasswordButton.on("click", validatePassword);

  function checkPasswords() {
    var password = passwordInput.val();
    var passwordCheck = passwordCheckInput.val();

    // 하나 이상의 비밀번호 입력 값이 빈 경우
    if (password === "" || passwordCheck === "") {
      passwordCheckText.css("color", "#FF0000"); // 빨간색으로 변경
      passwordCheckText.text("비밀번호를 입력해주세요.");
    } else if (password === passwordCheck) { // 비밀번호가 비밀번호 확인과 일치할 경우
      passwordCheckText.css("color", "#2ECC71"); // 초록색으로 변경
      passwordCheckText.text("비밀번호가 일치합니다!");
    } else { // 비밀번호가 일치하지 않을 경우
      passwordCheckText.css("color", "#FF0000"); // 빨간색으로 변경
      passwordCheckText.text("비밀번호가 일치하지 않습니다.");
    }
  }

  function validatePassword() {
    var password = passwordInput.val();
    var passwordCheck = passwordCheckInput.val();

    // 비밀번호 조건을 충족하지 않거나 비밀번호가 일치하지 않을 경우
    if (isPasswordValid(password) && password === passwordCheck) {
      Swal.fire({
        title: "알림",
        text: "비밀번호가 변경되었습니다!",
        icon: "success",
        width: 360 
      });
      return true; // 클릭 이벤트 실행
    } else {
      Swal.fire({
        title: "알림",
        text: "비밀번호를 다시 확인해주십시오",
        icon: "warning",
        width: 360 
      });
      return false; // 클릭 이벤트 중단
    }
  }

  function isPasswordValid(password) {
    // 영어 대/소문자, 숫자, 특수문자 포함 여부 체크
    var hasLowerCase = /[a-z]/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);
    var hasNumber = /[0-9]/.test(password);
    var hasSpecialChar = /[!@#$%^&*]/.test(password);

    // 비밀번호 길이 체크
    var isLengthValid = password.length >= 8;

    return hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && isLengthValid;
  }
});

/* password-change-complete페이지 */

/* find-id 페이지 */

/* 이메일 형식에 따라 아래 표기 */
$(document).ready(function() {
  // 이메일 입력 요소
  var emailInput = $(".email-input-cf-text");
  var emailSendButton = $(".email-cf-send-btn");
  var pleaseEmailInput = $(".please-email-input");

  // 이메일 보내기 버튼 클릭 시 이벤트 처리
  emailSendButton.on("click", validateEmailFormat);

  function validateEmailFormat() {
    var email = emailInput.val();

    if (email === "" || !isValidEmailFormat(email)) {
      pleaseEmailInput.text("알맞은 이메일 형식을 입력해주세요.");
      pleaseEmailInput.css("color", "#ff0000"); // 빨간색으로 변경
      return false;
    } else {
      pleaseEmailInput.text("알맞은 이메일 형식입니다.");
      pleaseEmailInput.css("color", "#2acf7dc4"); // #2acf7dc4색으로 변경
      return true;
    }
  }

  function isValidEmailFormat(email) {
    // 이메일 형식 검사 로직을 추가해주세요.
    // 예: 정규식 사용하여 이메일 형식 검사
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
});

/* 인증메일 보내면 아래 적은 이메일 주소로 보냈다고 텍스트 띄우기 */
$(document).ready(function() {
  $(".email-cf-send-btn").click(function() {
    var email = $(".email-input-cf-text").val();
    if (isValidEmail(email)) {
      $(".after-send-eamil").css("color", "#2acf7dc4").html(email + "으로<br>인증메일을 보내드렸습니다.");
    } else {
      $(".after-send-eamil").css("color", "red").text("알맞은 이메일 형식을 입력해주세요.");
    }
  });

  function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
});
/* find-id 페이지 */

