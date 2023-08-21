import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* .plus 누르면 모달 나오게 */
$(function(){
  $('.plus').click(function(){
    $('.chat-create-modal').addClass('active')
  })
})
/* .modal-close 누르면 모달창 닫히게 */
$(function(){
  $('.modal-close').click(function(){
    $('.chat-create-modal').removeClass('active')
  })
})