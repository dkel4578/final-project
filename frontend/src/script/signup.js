import $ from 'jquery';
import Swal from 'sweetalert2';
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

/* join-in 페이지 */

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
      $(".input-pw-text").css("color", "#2acf7d").text("영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리 이상의 조합이어야 합니다.");
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
