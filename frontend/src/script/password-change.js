
import $ from 'jquery'; 

import Swal from "sweetalert2";

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

