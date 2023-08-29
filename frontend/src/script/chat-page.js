import $ from 'jquery';

/* other-msg-block 클릭시 신고모달 나오기 */
$(function(){
  $('.chatting-msg').click(function(){
    $('.user-report-modal').toggleClass('active');
  });
});

/*  x버튼, 모달 취소 클릭시 모달 토글 */
$(function(){
  $('.modal-close').click(function(){
    $('.user-report-modal').removeClass('active');
  });
});

$(function(){
  $('#user-report-modal-cancel').click(function(){
    $('.user-report-modal').removeClass('active');
  });
});