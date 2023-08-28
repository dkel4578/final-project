import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* 비밀번호 잊었나요? 클릭시 모달 */
$(function(){
  $('.forgot-password').click(function(){
    console.log('dd')
    $('.find-password-modal').addClass('active')
  })
})

/* 클릭시 모달 닫기 */
$(function(){
  $('.find-password-modal fieldset .fa').click(function(){
    $('.find-password-modal').removeClass('active')
  })
})

