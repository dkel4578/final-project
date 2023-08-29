import React from "react";  // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/password-change-complete.css";
import "../css/variables.css";
import "../script/password-change-complete.js"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";
import {Link } from "react-router-dom";

const PasswordChangeComplete = () => {
  return (
    <section className="password-change-complete">
      <div className="password-change-complete-inner">
        <h1 className="password-change-complete-title">비밀번호 확인</h1>
        <form>
          <fieldset>
            <div className="input-pw">
              <input type="password" placeholder="비밀번호" />
              <i className="bi bi-eye-slash toggle-eye"></i>
            </div>
            <p className="input-pw-text">
              영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 <br></br> 모두 포함된 8자리 이상의 조합이어야 합니다!
            </p>
            <div className="input-pw-check">
              <input type="password" placeholder="비밀번호 확인" className="input-pw-check-input"/>
              <i className="bi bi-check-all"></i>
            </div>
            <p className="input-pw-check-text">비밀번호가 일치하지 않습니다!</p>
          </fieldset>
          <div className="password-change-complete-btn">
            <Link to = "/">비밀번호 변경</Link>
          </div>
        </form>
        <div className="password-change-complete-user-find">
          <Link to ="/signup">회원가입</Link>
          <Link to ="/findId">아이디 찾기</Link>
        </div>
      </div>
    </section>
  );
};

export default PasswordChangeComplete;
