import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* 별누르면 점수 주기 */
$(function(){
  $('.manner-star').click(function(){
    $(this).addClass('active');
    $(this).prevAll().addClass('active');
    $(this).nextAll().removeClass('active');
  });
});
/* 클릭시 모달 닫기 */
$(function(){
  $('.manner-score-modal-content .fa').click(function(){
    $('.manner-score-modal').removeClass('active')
  })
})