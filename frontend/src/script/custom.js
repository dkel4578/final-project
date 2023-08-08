import $ from 'jquery';

/* 헤더 인클루드 */
$(function(){
  $('.header-include').load('../html/header.html',function(){
  })
})

/* 헤더 사이드바 커뮤니티 슬라이드 업다운 */
$(function(){
  $('.category-comu').click(function(){
    $(this).nextAll('.category-sub').stop().slideToggle(1000);
  })
})

/* 푸터 인클루드 */
$(function(){
  $('.footer-include').load('../html/footer.html')
})


/* faq 타이틀 클릭 */
$(function(){
  // $('.faq-title').click(function(){
  //   $(this).toggleClass('active');
  //   $(this).siblings('.faq-title').removeClass('active');
  //   $(this).next('.faq-content').stop().slideToggle();
  //   let accodionImg = $(this).attr('data-faq');
  //   $('.' + accodionImg).addClass('active');
  //   $('.' + accodionImg).siblings().removeClass('active');
  // })
})

/* faq 타이틀 클릭-2 */
$(function(){
  $('.faq-title').click(function(){
    $(this).toggleClass('active');
    $(this).siblings('.faq-content').stop().slideToggle();
  
  })
})

/* 게시판 카테고리 활성화시 폰트 볼드 */
$(function(){
  $('.board-kind a').click(function(){
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
  })
})

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

/* 게시판 페이징 색상변경 */
$(function(){
  $('.paging-ball').click(function(){
    $(this).addClass('active');
    $(this).siblings('.paging-ball').removeClass('active');
  })
})

