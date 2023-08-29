import $ from 'jquery';
/* 사이렌 이미지, x버튼, 모달 취소 클릭시 모달 토글 */
$(function(){
  $('.siren2,.siren,.modal-close').click(function(){
    $('.user-report-modal').toggleClass('active');
  });
});

$(function(){
  $('#user-report-modal-cancel').click(function(){
     $('.user-report-modal').removeClass('active');
  });
});

// 댓글 사이렌 작성
// $(document).ready(function() {
//   // 사이렌 이미지, "x" 버튼 및 모달 취소 버튼에 대한 클릭 이벤트 핸들러 추가
//   $('.siren2, .siren, .modal-close').click(function() {
//     // 모달을 찾아서 active 클래스를 토글합니다.
//     $('.user-report-modal').toggleClass('active');
//   });
// });