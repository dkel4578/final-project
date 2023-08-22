import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/write-post.css";
import "../css/variables.css";
import "../script/write-post.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";

const WritePost = () => {
  return (
    <section className="write-post">
      <div className="write-post-inner">
        <div className="write-post-title">게시글 작성</div>
        <div className="write-post-contents">
          <div className="select-board-box">
            <select id="board-select">
              <option>게시판을 선택해주세요</option>
              <option>커피한잔할래요</option>
              <option>같이여행할래요</option>
              <option>식사같이할래요</option>
              <option>술한잔할래요</option>
              {/* faq는 운영자만 보이게 */}
              <option>FAQ</option>
            </select>
          </div>
          <div className="write-title-box">
            <input
              type="text"
              className="write-title"
              placeholder="게시글 제목을 입력해주세요"
            />
          </div>
          <div className="write-post-text-place">
            <textarea
              id="write-post"
              cols="30"
              rows="10"
              placeholder="게시글 작성 API 불러오기로 함 지도랑 이미지 첨부도 되나?"
            ></textarea>
          </div>
          <div className="write-post-map-place">
            <h2>지도를 첨부해주세요 (선택)</h2>
            <div className="write-post-map"></div>
          </div>
        </div>
        <div className="write-post-content-btns">
          <input
            type="button"
            className="map-attach-btn"
            value="지도 첨부"
          ></input>
          <input
            type="button"
            className="image-attach-btn"
            value="이미지 첨부"
          ></input>
        </div>
        <div className="write-post-btn-place">
          <input
            type="button"
            className="write-post-btn"
            value="등록하기"
          ></input>
        </div>
      </div>
    </section>
  );
};

export default WritePost;
