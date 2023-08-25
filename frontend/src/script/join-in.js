import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* 비밀번호 입력시 정규식 충족하면 글씨 초록색으로 바뀌게 */
$(document).ready(function() {
  $(".pw-input").on("input", function() {
    var password = $(this).val();
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var message = "영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리 이상의 조합이어야 합니다!";
    var message2 = "영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리 이상의 조합입니다!";
    if (passwordRegex.test(password)) {
      $(".input-pw-text").css("color", "#2acf7d").text(message2);
    } else {
      $(".input-pw-text").css("color", "red").text(message);
    }
  });
});

/* 위아래 비밀번호 같을때 / 같지않을떄 */
$(document).ready(function() {
  $(".pw-input, .pw-check-input").on("input", function() {
    var password = $(".pw-input").val();
    var confirmPassword = $(".pw-check-input").val();
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!password) {
      $(".input-pw-check-text").css("color", "red").text("공란입니다!");
    } else if (password === confirmPassword) {
      $(".input-pw-check-text").css("color", "#2acf7d").text("비밀번호가 일치합니다!");
    } else {
      $(".input-pw-check-text").css("color", "red").text("비밀번호가 일치하지 않습니다!");
    }

    if (passwordRegex.test(password)) {
      $(".input-pw-text").css("color", "#2acf7d").text("영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리 이상의 조합입니다!");
    } else {
      $(".input-pw-text").css("color", "red").text("영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리 이상의 조합이어야 합니다.");
    }
  });
});

/* 이메일 인풋에 형식 맞춰서 아래 스팬에 글씨출력 */
$(document).ready(function() {
  $(".email-input").on("input", function() {
    var email = $(".email-input").val();
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!email || !email.includes("@")) {
      $(".input-email-check-text").css("color", "red").text("알맞은 이메일 형식을 입력해주세요.");
    } else if (emailRegex.test(email)) {
      $(".input-email-check-text").css("color", "#2acf7d").text("알맞은 이메일 형식입니다.");
    } else {
      $(".input-email-check-text").css("color", "red").text("알맞은 이메일 형식을 입력해주세요.");
    }
  });
});

/* 인증메일 보내면 아래 텍스트 해당메일로 전달 나오게함 */
$(document).ready(function() {
  $(".cf-number-send-btn").on("click", function() {
    var email = $(".email-input").val();
    if (email) {
      $(".cf-number-send-text").css("color", "#2acf7d").html(email + "으로 인증메일을 </br> 전달드렸습니다!");
    } else {
      $(".cf-number-send-text").css("color", "red").html("알맞은 이메일 주소를 입력해주세요.");
    }
  });
});

/* 인증번호 6자리 숫자만 입력하게 안내문구 */
$(document).ready(function() {
  $(".cfnumber-input").on("input", function() {
    var cfNumber = $(this).val();
    
    if (!/^[0-9]+$/.test(cfNumber)) {
      $(".input-cfnumber-text").css("color", "red").text("숫자만 입력해주세요!");
    } else if (cfNumber.length !== 6) {
      $(".input-cfnumber-text").css("color", "red").text("인증번호 6자리를 입력해주세요.");
    } else {
      $(".input-cfnumber-text").css("color", "#2acf7d").text("인증번호 6자리를 입력하였습니다.");
    }
  });
});
/* 생년월일 8자리 형식 안넣으면 아래 빨간글씨 / 넣으면 초록글씨 */
$(document).ready(function () {
  // .birth-input의 값이 변경될 때마다 동작 설정
  $(".birth-input").on("input", function () {
    var birthInput = $(this);
    var birthText = $(".input-birth-text");

    // 작대기 제외한 숫자 추출
    var birthValue = birthInput.val().replace(/[^0-9]/g, "");

    if (birthValue.length === 8) {
      birthText.css("color", "#2acf7dc4");
      birthText.text("생년월일 8자리를 입력하였습니다!");
    } else {
      birthText.css("color", "red");
      birthText.text("생년월일은 꼭 8자리로 입력해주세요!");
    }

    // 작대기(-) 포함시 빨간색으로 변경
    if (birthInput.val().includes("-")) {
      birthText.css("color", "red");
      birthText.text("생년월일은 꼭 8자리로 입력해주세요!");
    }
  });
});