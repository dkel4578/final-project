import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
$(function(){
  $('.map-attach-btn').click(function(){
    $('.post-content-modify-modal').addClass('active');
  })
})

$(function(){
  $('.modal-close').click(function(){
    $('.post-content-modify-modal').removeClass('active');
  })
})