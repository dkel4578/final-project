import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* 이메일 형식에 따라 아래 표기 */
$(document).ready(function() {
  // 이메일 입력 요소
  var emailInput = $(".email-input-cf-text");
  var emailSendButton = $(".email-find-id-cf-send-btn");
  var pleaseEmailInput = $(".please-find-id-email-input");

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
