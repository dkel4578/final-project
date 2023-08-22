import $ from 'jquery'; // eslint-disable-line no-unused-vars

/* 게시판 카테고리 활성화시 폰트 볼드 */
$(function(){
  $('.board-kind a').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
  })
})

/* 게시판 페이징 색상변경 */
$(function(){
  $('.paging-ball').click(function(){
    $(this).addClass('active');
    $(this).siblings('.paging-ball').removeClass('active');
  })
})
