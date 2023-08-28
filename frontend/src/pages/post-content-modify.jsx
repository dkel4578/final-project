import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/post-content-modify.css";
import "../css/variables.css";
import "../script/post-content-modify.js";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";

const PostContentModify = () => {
  return (
    <section className="post-content-modify">
      <div className="post-content-modify-modal">
        <div className="user-report-modal-contents">
          <h2>지역검색</h2>
          <i className="fa fa-times modal-close" aria-hidden="true"></i>
          <div className="search-map-place">
            <input
              type="text"
              className="search-map"
              placeholder="찾으시는 지역을 입력해주세요."
            />
            <i className="bi bi-search-heart"></i>
          </div>
          <div className="search-map-btn-place">
            <input type="button" value="검색" className="search-map-btn" />
          </div>
        </div>
      </div>
      <div className="post-content-modify-inner">
        <div className="post-content-modify-board-species">
          <select id="post-content-modify-board-select">
            <option>게시판을 선택해주세요</option>
            <option>커피한잔할래요</option>
            <option>같이여행할래요</option>
            <option>식사같이할래요</option>
            <option>술한잔할래요</option>
            {/* faq는 운영자만 보이게 */}
            <option>FAQ</option>
          </select>
        </div>
        <div className="post-modify-title">
          <input
            type="text"
            placeholder="글 제목 데이터로 쏴주기"
            className="post-modify-title-box"
          />
        </div>
        <div className="post-main-modify-contents">
          <div className="post-main-modify-content">
            <textarea
              cols="30"
              rows="10"
              className="post-main-modify-content-text"
            >
              내용 데이터로 받아오기
            </textarea>
          </div>
        </div>
        <div className="post-main-content-modify-btns">
          <input type="button" className="map-attach-btn" value="지도 첨부" />
          <input
            type="button"
            className="image-attach-btn"
            value="이미지 첨부"
          />
        </div>
        <div className="modify-complete-btn-place">
          <input
            type="button"
            className="modify-complete-btn"
            value="수정 완료"
          />
        </div>
      </div>
    </section>
  );
};

export default PostContentModify;
