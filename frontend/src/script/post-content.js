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