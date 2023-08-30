import $ from 'jquery';
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars

/* 눈모양 누르면  비밀번호 보이게 만들기 (전체 페이지)*/
$(function(){
  $('.toggle-eye').click(function(){
    /* toggle 아이콘 모양 */
    $(this).toggleClass('bi-eye')
    /* toggle 인풋타입 */
    let inputType = $(this).parent().children('input').attr('type');
    if(inputType == 'password'){
      $(this).parent().children('input').attr('type', 'text');
    }else{
      $(this).parent().children('input').attr('type', 'password');
    }
  })
})

/* 헤더 사이드바 커뮤니티 슬라이드 업다운 */
// $(function(){
//   $('.category-comu').click(function(){
//     $(this).nextAll('.category-sub').stop().slideToggle(1000);
//   })
// })

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