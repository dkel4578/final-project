import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/join-in.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "../script/join-in.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";

function JoinIn() {

  <section className="sign-up">
  <h1>회원가입</h1>
  <div className="sign-up-inner">
    <form className="sign-up-place">
      <div className="id-place place">
        <div className="id-subject subject">
          <p>아이디</p>
          <input type="button" value="중복검사" />
        </div>
        <div className="input-box input-id">
          <input
            type="text"
            className="input-kind id-input"
            placeholder="사용하실 아이디를 입력해주세요."
          />
          <i className="bi bi-person-fill-check"></i>
        </div>
        <span>
          사용가능한 아이디입니다! / 이미 사용하고있는 아이디입니다.
        </span>
      </div>
      <div className="pw-place place">
        <div className="pw-subject subject">
          <p>비밀번호</p>
        </div>
        <div className="input-box input-pw">
          <input
            type="password"
            className="input-kind pw-input"
            placeholder="비밀번호"
          />
          <i className="bi bi-eye-slash toggle-eye"></i>
        </div>
        <span className="input-pw-text">
          영어 대/소문자, 숫자, 특수문자(!@#$%^&*)가 모두 포함된 8자리
          이상의 조합이어야 합니다!
        </span>
      </div>
      <div className="pw-check-place place">
        <div className="pw-check-subject subject">
          <p>비밀번호 확인</p>
        </div>
        <div className="input-box input-pw-check">
          <input
            type="password"
            className="input-kind pw-check-input"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          <i className="bi bi-check-all"></i>
        </div>
        <span className="input-pw-check-text"
          >비밀번호가 일치하지않습니다!</span
        >
      </div>
      <div className="email-place place">
        <div className="email-subject subject">
          <p>이메일</p>
          <input type="button" value="중복검사" />
        </div>
        <div className="input-box input-email">
          <input
            type="email"
            className="input-kind email-input"
            placeholder="해당메일로 인증번호를 보냅니다."
          />
          <i className="bi bi-envelope-fill"></i>
        </div>
        <span className="input-email-check-text"
          >알맞은 이메일 주소를 입력해주세요</span
        >
      </div>
      <div className="cf-number-send-place place">
        <input type="button" value="해당 메일로 인증번호 보내기" className="cf-number-send-btn"/>
        <span className="cf-number-send-text"
        >곧 이메일로 인증번호가 발송됩니다.</span
      >
      </div>
      <div className="cfnumber-place place">
        <div className="cfnumber-subject subject">
          <p>인증번호</p>
          <input type="button" value="인증번호 확인"/>
        </div>
        <div className="input-box input-cfnumber">
          <input
            type="text"
            className="input-kind cfnumber-input"
            placeholder="메일로 보낸 인증번호를 입력하세요."
          />
          <i className="bi bi-send-fill"></i>
        </div>
        <span className="input-cfnumber-text"
          >인증번호 6자리를 입력해주세요 (숫자만)</span
        >
      </div>
      <div className="nick-name-place place">
        <div className="nick-subject subject">
          <p>닉네임</p>
          <input type="button" value="중복검사" />
        </div>
        <div className="input-box input-nickname">
        <input
          type="text"
          className="input-kind nick-input"
          placeholder="사용하실 닉네임을 입력해주세요."
        />
        <i className="bi bi-person-check-fill"></i>
      </div>
      <span className="input-nickname-text"
      >사용가능한 닉네임입니다! / 이미 사용하고있는 닉네임입니다.(데이터
      보내서 수정해야함)</span
    >
    </div>
      <div className="name-place place">
        <div className="name-subject subject">
          <p>이름</p>
        </div>
        <div className="input-box input-name">
          <input
          type="text"
          className="input-kind name-input"
          placeholder="실명을 입력해주세요."
        />
        <i className="bi bi-person-lines-fill"></i>
        </div>           
      </div>
      <div className="phone-place place">
        <div className="phone-subject subject">
          <p>휴대폰 번호</p>
        </div>
        <div className="input-box input-phone">
        <input
          type="tel"
          className="input-kind phone-input"
          placeholder="휴대폰 번호를 입력해주세요."
        />
        <i className="bi bi-phone-vibrate-fill"></i>
        </div>
      </div>
      <div className="birth-place place">
        <div className="birth-subject subject">
          <p>생년월일</p>
        </div>
        <div className="input-box input-phone">
          <input
          type="text"
          className="input-kind birth-input"
          placeholder="생년월일 8자리를 입력해주세요"
        />
        <i className="bi bi-calendar-heart-fill"></i>
      </div>
        <span className="input-birth-text"
        >생년월일은 8자리로 입력해주세요! 예t 20000101
        </span>         
      </div>
      <div className="gender-place place">
        <div className="gender-subject subject">
          <p>성별</p>
        </div>
        <div className="gender-check-place">
          <div className="male-check">
            <label htmlFor="male">
                <input type="radio" name="gender" id="male" className="gender-input" value="m"></input>
                <p>남성</p>
            </label>
          </div>
          <div className="female-check">
            <label htmlFor="female">
                <input type="radio" name="gender" id="female" className="gender-input" value="f"></input>
                <p>여성</p>
            </label>
          </div>
        </div>
      </div>
      <div className="introduce-place place">
        <div className="introduce-subject subject">
          <p>자기소개</p>
        </div>
        <textarea cols="20" rows="5"></textarea>
      </div>
    </form>
    <div className="join-complete-btn">
      <a href="" className="join-btn">회원가입 완료</a>
    </div>
  </div>
</section>
}

export default JoinIn;