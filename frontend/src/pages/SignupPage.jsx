import React, { useState, useRef, useContext, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/join-in.css" ;
import "../css/total.css";
import "../css/variables.css";
import "../script/custom.js";
import "../script/signup.js";
import Swal from 'sweetalert2';

function SignupPage() {
	const navigate = useNavigate();

  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const emailRef = useRef(null);
  const authenticationRef = useRef(null);
  const nicknameRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const birthRef = useRef(null);
  const genderRef = useRef(null);
  const profileMessageRef = useRef(null);

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckText, setPasswordCheckText] = useState("비밀번호를 입력해주세요!");
  const [cfNumber, setCfNumber] = useState("");
  const [cfNumberMessage, setCfNumberMessage] = useState("인증을 완료해주세요!");
  const [phone, setPhone] = useState("");
  const [idFlg, setIdFlg] = useState(false);
  const [nicknameFlg, setNicknameFlg] = useState(false);
  const [emailFlg, setEmailFlg] = useState(false);
  const [birth, setBirth] = useState("");
  
  // 패스워드 검증
  const [passwordValidation, setPasswordValidation] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLengthValid: false,
  })
  // 이메일 형식 검증
  const isValidEmail = (email) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    setupPasswordValidation()
  }, []);

  useEffect(() => {
    checkPasswords();
  }, [password, passwordCheck]);

  const setupPasswordValidation = () => {
    const passwordInput = document.querySelector(".input-pw input[type=password]");

    passwordInput.addEventListener("input", function() {
      const password = this.value;
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*]/.test(password);
      const isLengthValid = password.length >= 8;
  
      setPasswordValidation({
        hasLowerCase,
        hasUpperCase,
        hasNumber,
        hasSpecialChar,
        isLengthValid,
      });
    });
  }
  const checkPasswords = () => {
    if (password === "" || passwordCheck === "") {
      setPasswordCheckText("비밀번호를 입력해주세요!");
    } else if (password === passwordCheck) {
      setPasswordCheckText("비밀번호가 일치합니다!");
    } else {
      setPasswordCheckText("비밀번호가 일치하지 않습니다!");
    }
  };

  const handleEmailSendClick = () => {
    if (isValidEmail(email)) {
      setEmailMessage(
        <span style={{ color: "#2acf7dc4" }}>
          {email}으로<br />인증메일을 보내드렸습니다.
        </span>
      );
    } else {
      setEmailMessage(<span style={{ color: "red" }}>알맞은 이메일 형식을 입력해주세요.</span>);
    }
  };

  const handleCfNumberInput = (event) => {
    const inputValue = event.target.value;

    if (!/^[0-9]+$/.test(inputValue)) {
      setCfNumberMessage(<span style={{ color: "red" }}>숫자만 입력해주세요!</span>);
    } else if (inputValue.length !== 6) {
      setCfNumberMessage(<span style={{ color: "red" }}>인증번호 6자리를 입력해주세요.</span>);
    } else {
      setCfNumberMessage(<span style={{ color: "#2acf7d" }}>인증번호 6자리를 입력하였습니다.</span>);
    }

    setCfNumber(inputValue);
  };
  const handleNumberInput = (event) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/\D/g, "");
    if(numericValue.length <= 11){
    setPhone(numericValue);
    }
  };

  const handleBirthInput = (event) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/\D/g, "");
    if (numericValue.length <= 8) {
      setBirth(numericValue);
    }
  };

  const idCheckHandler = async (e) =>{
    e.preventDefault();

    const loginId = loginIdRef.current.value;
    
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    console.log(loginId)
    if(!loginId){
      Swal.fire({
        icon : 'success',
        title : '중복 검사',         // Alert 제목
        text : '아이디를 입력해주세요', 
        width: 300,
      });
      return;
    } else{
    fetch(`api/idCheck?loginId=${encodeURIComponent(loginId)}`, {
      method: 'GET',
      headers :{
        "Content-Type" : jsonContent,
      }
      }) .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("이미 사용 중인 아이디입니다.");
        }
      })
      .then(message => {
        // 아이디 사용 가능한 경우 처리
        loginIdRef.current.disabled = true;
        setIdFlg(true);
        Swal.fire({
          icon : 'success',
          title : '중복 검사',         // Alert 제목
          text : message, 
          width: 300,
        });
      })
      .catch(error => {
        // 아이디 중복인 경우 처리
        Swal.fire({
          icon : 'error',
          title : '중복 검사',         // Alert 제목
          text : error,
          width: 300,  // Alert 내용 
        });
      });
    }
  }
  const nicknameCheckHandler = async (e) =>{
    e.preventDefault();

    const nickname = nicknameRef.current.value;
    
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    if(!nickname){
      Swal.fire({
        icon : 'success',
        title : '중복 검사',         // Alert 제목
        text : '닉네임을 입력해주세요', 
        width: 300,
      });
      return;
    }else{
    fetch(`api/nicknameCheck?nickname=${encodeURIComponent(nickname)}`, {
      method: 'GET',
      headers :{
        "Content-Type" : jsonContent,
      }
      }) .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("이미 사용 중인 닉네임입니다.");
        }
      })
      .then(message => {
        nicknameRef.current.disabled = true;
        setNicknameFlg(true);
        Swal.fire({
          icon : 'success',
          title : '중복 검사',         // Alert 제목
          text : message,
          width: 300,  // Alert 내용 
        });
      })
      .catch(error => {
        Swal.fire({
          icon : 'error',
          title : '중복 검사',         // Alert 제목
          text : error,
          width: 300,  // Alert 내용 
        });
      });
    }
  }

  const emailCheckHandler = async (e) =>{
    e.preventDefault();

    const email = emailRef.current.value;
    
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    if(!email){
      Swal.fire({
        icon : 'success',
        title : '중복 검사',         // Alert 제목
        text : '이메일을 입력해주세요', 
        width: 300,
      });
      return;
    }else{
    fetch(`api/emailCheck?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers :{
        "Content-Type" : jsonContent,
      }
      }) .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("이미 사용 중인 이메일입니다.");
        }
      })
      .then(message => {
        emailRef.current.disabled = true;
        setEmailFlg(true);
        Swal.fire({
          icon : 'success',
          title : '중복 검사',         // Alert 제목
          text : message,
          width: 300,  // Alert 내용 
        });
      })
      .catch(error => {
        Swal.fire({
          icon : 'error',
          title : '중복 검사',         // Alert 제목
          text : error,
          width: 300,  // Alert 내용 
        });
      });
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if(!idFlg){
      alert("아이디 중복 검사를 완료하십시오.")
    } else if (!nicknameFlg){
      alert("닉네임 중복 검사를 완료하십시오.")
    } else if (!emailFlg){
      alert("이메일 중복 검사를 완료하십시오.")
    } else
      {
      const loginId = loginIdRef.current.value;
      const password = passwordRef.current.value;
      const email = emailRef.current.value;
      const nickname = nicknameRef.current.value;
      const name = nameRef.current.value;
      const phone = phoneRef.current.value;
      const birth = new Date(Date(birthRef.current.value)).toISOString().split('T')[0];
      const gender = genderRef.current.value;
      const profileMessage = profileMessageRef.current.value;
  
      const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  
      console.log(birth);
      fetch('api/signup', {
        method: 'POST',
        headers :{
          "Content-Type" : jsonContent,
        },
        body : JSON.stringify({
          loginId : loginId,
          password : password,
          email : email,
          nickname : nickname,
          name : name,
          phone : phone,
          birth : birth,
          gender : gender,
          profileMessage : profileMessage
        })
      })
      .then(res => {
        if(res.status !== 200){
          return  Swal.fire({
            icon : 'error',
            title : '회원가입',         // Alert 제목
            text : "회원가입에 실패하였습니다.",
            width: 300,  // Alert 내용 
          });
        }
        Swal.fire({
          icon : 'success',
          title : '회원가입',         // Alert 제목
          text : "회원가입에 성공하였습니다.",
          width: 300,  // Alert 내용 
        });
        navigate('/login', true);
        return res.json();
      })
    }
    }
	return (
		<>
			<section className="sign-up">
				<h1>회원가입</h1>
				<div className="sign-up-inner">
					<form className="sign-up-place" onSubmit={submitHandler}>
						<div className="id-place place">
							<div className="id-subject subject">
								<p>아이디</p>
								<input type="button" value="중복검사" onClick={idCheckHandler}/>
							</div>
							<div className="input-box input-id">
								<input
									type="text"
									className="input-kind id-input"
                  id="idInputBox"
									placeholder="사용하실 아이디를 입력해주세요."
                  required
                  ref={loginIdRef}
								/>
								<i className="bi bi-person-fill-check"></i>
							</div>
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
                  required
                  ref={passwordRef}
                  onChange={(e) => setPasswordCheck(e.target.value)}
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
                  required
                  ref={passwordCheckRef}
								/>
								<i className="bi bi-check-all"></i>
							</div>
							<span className="input-pw-check-text" style={{ color: passwordCheck === password ? "#2ECC71" : "red" }}>
								{passwordCheckText}
							</span>
						</div>
						<div className="email-place place">
							<div className="email-subject subject">
								<p>이메일</p>
								<input type="button" value="중복검사" onClick={emailCheckHandler}/>
							</div>
							<div className="input-box input-email">
								<input
									type="email"
									className="input-kind email-input"
									placeholder="해당메일로 인증번호를 보냅니다."
                  required
                  ref={emailRef}
								/>
								<i className="bi bi-envelope-fill"></i>
							</div>
							<span className="input-email-check-text">
								알맞은 이메일 주소를 입력해주세요
							</span>
						</div>
						<div className="cf-number-send-place place">
							<input
								type="button"
								value="해당 메일로 인증번호 보내기"
								className="cf-number-send-btn"
                onClick={handleEmailSendClick}
							/>
							<span className="cf-number-send-text">
              {emailMessage}
							</span>
						</div>
						<div className="cfnumber-place place">
							<div className="cfnumber-subject subject">
								<p>인증번호</p>
								<input type="button" value="인증번호 확인" />
							</div>
							<div className="input-box input-cfnumber">
								<input
									type="text"
									className="input-kind cfnumber-input"
									placeholder="메일로 보낸 인증번호를 입력하세요."
                  required
                  ref={authenticationRef}
                  onChange={handleCfNumberInput}
                  value={cfNumber}
								/>
								<i className="bi bi-send-fill"></i>
							</div>
							<span className="input-cfnumber-text">
              {cfNumberMessage}
							</span>
						</div>
						<div className="nick-name-place place">
							<div className="nick-subject subject">
								<p>닉네임</p>
								<input type="button" value="중복검사" onClick={nicknameCheckHandler}/>
							</div>
							<div className="input-box input-nickname">
								<input
									type="text"
									className="input-kind nick-input"
									placeholder="사용하실 닉네임을 입력해주세요."
                  required
                  ref={nicknameRef}
								/>
								<i className="bi bi-person-check-fill"></i>
							</div>
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
                  required
                  ref={nameRef}
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
                  required
                  ref={phoneRef}
                  onChange={handleNumberInput}
                  value={phone}
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
									placeholder="생년월일 8자리 ( - 제외 )"
                  required
                  onChange={handleBirthInput}
                  value={birth}
                  ref={birthRef}
								/>
								<i className="bi bi-calendar-heart-fill"></i>
							</div>
						</div>
						<div className="gender-place place">
							<div className="gender-subject subject">
								<p>성별</p>
							</div>
							<div className="gender-check-place">
								<div className="male-check">
									<label htmlFor="male">
										<input
											type="radio"
											name="gender"
											id="male"
											className="gender-input"
											value="m"
                      defaultChecked
                      ref={genderRef}
										/>
										<p>남성</p>
									</label>
								</div>
								<div className="female-check">
									<label htmlFor="female">
										<input
											type="radio"
											name="gender"
											id="female"
											className="gender-input"
											value="F"
                      ref={genderRef}
										/>
										<p>여성</p>
									</label>
								</div>
							</div>
						</div>
						<div className="introduce-place place">
							<div className="introduce-subject subject">
								<p>자기소개</p>
							</div>
							<textarea cols="20" rows="5"
                ref={profileMessageRef}></textarea>
						</div>
					<div className="join-complete-btn">
						<button className="join-btn" type="submit" onClick={submitHandler}>
							회원가입 완료
						</button>    
					</div>
          </form>
				</div>     
			</section>
		</>
	);
}

export default SignupPage;
