import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/my-page.css";
import "../css/variables.css";
import "../script/my-page.js"
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";

const MyPage = () => {
  return (
    <section className="my-page">
      <div className="my-page-inner">
        <h1 className="my-page-title">나의 정보</h1>
        <div className="picture-place">
          <div className="user-profile-img">
            <img src="../images/user-profile-test.jpg" alt="유저 프로필사진" />
          </div>
          <div className="user-nick-names">
            <p>닉네임 백단에서 받아올것</p>
            <p>test1@test.com</p>
          </div>
        </div>
        <div className="user-info-place">
          <div className="user-info-place-inner">
            <div className="user-basic-info">
              <div className="user-name-place user-place">
                <p>이름</p>
                <p>홍찰찰</p>
              </div>
              <div className="user-gender-place user-place">
                <p>성별</p>
                <p>남성</p>
              </div>
              <div className="user-phone-place user-place">
                <p>휴대폰 번호</p>
                <p>010-0000-0000</p>
              </div>
              <div className="user-birth-place user-place">
                <p>생년월일</p>
                <p>2000-01-01</p>
              </div>
            </div>
            <div className="user-introduce">
              <div className="user-introduce-title">자기소개</div>
              <div className="user-introduce-content">
                <p>
                  안녕하세요 와플대학 장학생 딸기잼 학과 홍찰찰이라고 합니다.
                  이번여행 재밌게 저와 함께하실분 구합니다. 남녀노소 즐거운 여행
                  함께 하고자 하시는 분은 톡 부탁드립니다. (데이터로 받아야함)
                </p>
              </div>
            </div>
            <div className="info-change-btn">
              <input
                type="button"
                value="비밀번호 입력하기"
                className="info-change-button"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 마이페이지 모달 (비번 입력) */}
      <div className="my-page-modal">
        <div className="modal-content">
          <i className="fa fa-times modal-close" aria-hidden="true"></i>
          <fieldset>
            <legend>비밀번호 입력</legend>
            <div className="my-page-modal-pw-container">
              <input type="password" placeholder="비밀번호를 입력해주세요." />
              <i className="bi bi-key-fill key"></i>
              <i className="bi bi-eye-slash toggle-eye"></i>
            </div>
          </fieldset>
          <div className="change-info-btn">
            <a href="../html/change-info.html">정보 수정하러 가기</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPage;
