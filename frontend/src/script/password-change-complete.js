import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
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