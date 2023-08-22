import React from 'react'; // eslint-disable-line no-unused-vars
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import "../script/board.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";

function MealBoard() {
  return (
    <div>
      <section className="board-place">
        <div className="board-kind">
          <a href="/board/coffee">커피한잔할래요</a>
          <a href="/board/trip">여행같이갈래요</a>
          <a href="/board/meal" className="active">같이식사할래요</a>
          <a href="/board/drink">술한잔할래요</a>
        </div>
        <div className="search-area">
          <div className="search">
            <input type="text" placeholder="검색어를 입력해주세요" />
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
          <div className="write-button">
            <a href="../html/write-post.html">
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <ul className="borad-main">
          <li className="board-content">
            <div className="board-info">
              <div className="board-title">
                <span>공지사항</span>
                <a href="/postContent">
                  왜들 그리 다운돼있어? 뭐가 문제야 say something 분위기가 겁나 싸해 요새는 이런 게 유행인가
                </a>
              </div>
              <div className="board-user-log">
                <span>글쓴이 생존전문가김병철</span>
                <span>시간 23-08-21 10:40</span>
                <span>조회수 15</span>
              </div>
            </div>
            <a href="/postContent" className="board-comment">
              <span>10</span>
              <span>댓글</span>
            </a>
          </li>
          {/* 다른 게시글들 */}
        </ul>
        <div className="board-paging">
          <a href="#none" className="paging-arrow left">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </a>
          <a href="#none" className="paging-ball active">1</a>
          <a href="#none" className="paging-ball">2</a>
          <a href="#none" className="paging-ball">3</a>
          <a href="#none" className="paging-ball">4</a>
          <a href="#none" className="paging-ball">5</a>
          <a href="#none" className="paging-arrow right">
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
        </div>
      </section>
    </div>
  );
}

export default MealBoard;