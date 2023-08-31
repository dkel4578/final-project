import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars

/* 푸터 인클루드 */
$(function(){
  $('.footer-include').load('../html/footer.html')
})

/* 헤더 사이드바 자기자신 클릭시 왼쪽으로 -9999px 이동하게 */
$(function(){
  $('.side-var').click(function(){
    $('input[id=trigger]').prop('checked', false);
  });
});