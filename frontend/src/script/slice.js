const pageSize = 5;
let currentPage = 0;

function loadMoreBoards() {
    // 서버로 다음 슬라이스의 게시물을 가져오기 위한 AJAX 요청
    $.get(`/api/boards?page=${currentPage}&size=${pageSize}`, function(response) {
        const boards = response.content;
        // 가져온 게시물을 UI에 추가
        for (const board of boards) {
            // 게시물 데이터를 HTML 요소에 추가
        }
        currentPage++; // 다음 요청을 위해 페이지 번호 증가
    });
}

// 스크롤 이벤트 리스너 설정하여 더 많은 게시물 불러오기
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
        loadMoreBoards();
    }
});

// 초기에 게시물 불러오기
loadMoreBoards();