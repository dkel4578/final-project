import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
/* my-page 모달 */
/* 정보수정하기 버튼 클릭시 모달창 나오기 */
$(function(){
  $('.info-change-button').click(function(){
    $('.my-page-modal').toggleClass('active');
  })
})

/* x누르면 모달창 닫기 */
$(function(){
  $('.modal-close').click(function(){
    $('.my-page-modal').toggleClass('active');
  })
})
/* my-page 모달 */