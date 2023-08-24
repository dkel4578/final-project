import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* faq 타이틀 클릭 */
$(function(){
  $('.faq-title').click(function(){
    $(this).toggleClass('active');
    $(this).siblings('.faq-content').stop().slideToggle();  
  })
})