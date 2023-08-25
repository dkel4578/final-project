import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* .plus 누르면 모달 나오게 */
$(function(){
  $('.plus').click(function(){
    $('.chat-create-modal').addClass('active')
  });
});
/* .modal-close 누르면 모달창 닫히게 */
$(function(){
  $('.modal-close').click(function(){
    $('.chat-create-modal').removeClass('active')
  });
});
/* 나가기 누르면 유저평가 모달 나오게 */
$(function(){
  $('.chat-leave').click(function(){
    $('.chat-user-evaluation-modal').addClass('active');
  });
});
/* 취소버튼 누르면 유저평가 모달 닫히게 */
$(function(){
  $('.chat-user-evaluation-cancel-btn').click(function(){
    $('.chat-user-evaluation-modal').removeClass('active');
  });
});
/* 별점주기 버튼 클릭시 별점주기 모달 나오게 */
$(function(){
  $('.chat-user-evaluation-modal-content-give-star').click(function(){
    $('.manner-score-modal').addClass('active')
  });
});