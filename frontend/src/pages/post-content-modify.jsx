import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/post-content-modify.css";
import "../css/variables.css";
import "../script/post-content-modify.js";
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
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
            <input
              type="button"
              value="검색"
              className="search-map-btn"
            />
          </div>
        </div>
      </div>
      <div className="post-content-modify-inner">
        <div className="post-modify-title">글제목 데이터로 불러오기</div>
        <div className="post-main-modify-contents">
          <div className="post-main-modify-content">
            <p>
              내용 데이터로 받아오기
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Officia sequi quam, animi distinctio, dicta doloremque esse iusto eaque sed non reprehenderit accusantium dolor soluta placeat possimus maxime vero minima aut fugiat. 
              Voluptates provident minima amet nulla repudiandae ex, recusandae laudantium? 
              Architecto est aperiam repellat quas dolorem autem ipsam, dolore quia ipsa, illo blanditiis! Veritatis repudiandae, et aut ea, 
              esse debitis odio quibusdam neque illum eligendi sint vero officiis amet eos beatae dolore excepturi tempora quod dolorem eveniet consequatur accusantium officia quo. 
              Quidem sed distinctio mollitia rem ipsa! Iusto vitae quae quidem, aut consequatur, ipsa, totam qui facere quisquam facilis corrupti.           
            </p>
          </div>
        </div>
        <div className="post-main-content-modify-btns">
          <input
            type="button"
            className="map-attach-btn"
            value="지도 첨부"
          />
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
            value="작성 완료"
          />
        </div>
      </div>
    </section>
  );
};

export default PostContentModify;
