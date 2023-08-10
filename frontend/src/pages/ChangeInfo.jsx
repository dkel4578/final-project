import React from "react"; // eslint-disable-line no-unused-vars
import { Link, useNavigate } from "react-router-dom"; // eslint-disable-line no-unused-vars
import { useState, useEffect, useRef } from "react"; // eslint-disable-line no-unused-vars
import { useCookies } from "react-cookie"; // eslint-disable-line no-unused-vars
import Swal from "sweetalert2"; // eslint-disable-line no-unused-vars
import axios from "axios";

import "../css/total.css";
import "../css/variables.css";
import "../script/custom.js";
import "../css/changeInfo.css";
async function getCode(email) {
	await axios
		.post("/api/email-cert?email=" + email, {
			email: email,
		})
		.then((response) => {
			console.log(response);
			// response.data.check;
		})
		.catch((error) => {
			console.log(error); //오류발생시 실행
		});
}

async function checkCode(email, code) {
	console.log("email: ", email);
	console.log("code: ", code);

	return await axios
		.get("/api/checkCode?email=" + email + "&code=" + code, {
			email: email,
			code: code,
		})
		.then((response) => {
			console.log(response);
			console.log(response.data);
			return response.data;
		})
		.catch((error) => {
			console.log(error); //오류발생시 실행
		});
}
//생년월일 형식 변경
function formatDateToYYYYMMDD(inputDate) {
	const date = new Date(inputDate); // 변환할 날짜 문자열을 Date 객체로 생성
	const year = date.getFullYear(); // 년도 추출
	const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 추출 (0부터 시작하므로 1을 더함)
	const day = String(date.getDate()).padStart(2, "0"); // 일 추출

	return `${year}${month}${day}`;
}

function ChangeInfo() {
	const [cookies] = useCookies(["token"]);
	let isLogin = false;
	const navigate = useNavigate(); // eslint-disable-line no-unused-vars

	const emailRef = useRef(null);
	const authenticationRef = useRef(null);
	const nicknameRef = useRef(null);
	const nameRef = useRef(null);
	const phoneRef = useRef(null);
	const birthRef = useRef(null);
	const genderRef = useRef(null);
	const profileMessageRef = useRef(null);

	const [id, setId] = useState("");
	const [loginId, setLoginId] = useState(""); // eslint-disable-line no-unused-vars
	const [nickname, setNickname] = useState(""); // eslint-disable-line no-unused-vars
	const [email, setEmail] = useState("");
	const [name, setName] = useState(""); // eslint-disable-line no-unused-vars
  const [gender, setGender] = useState(""); // eslint-disable-line no-unused-vars
	const [phone, setPhone] = useState(""); // eslint-disable-line no-unused-vars
	const [profileMessage, setProfileMessage] = useState(""); // eslint-disable-line no-unused-vars
	const [birth, setBirth] = useState(""); // eslint-disable-line no-unused-vars
  const [imageSrc, setImageSrc] = useState("");

	const [cfNumberMessage, setCfNumberMessage] =
		useState("인증을 완료해주세요!");
	const [cfNumber, setCfNumber] = useState("");
	const [emailMessage, setEmailMessage] = useState("");
	const [nicknameFlg, setNicknameFlg] = useState(true);
	const [authenticationFlg, setAuthenticationFlg] = useState(true);
	const [emailFlg, setEmailFlg] = useState(true);

	if (cookies.token != "undefined") {
		isLogin = true;
	} else {
		isLogin = false;
	}

	const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
	//유저 정보 가져오기
	useEffect(() => {
		if (isLogin) {
			fetch("/api/user/me", {
				method: "GET",
				headers: {
					"Content-Type": jsonContent,
					Authorization: "Bearer " + cookies.token,
				},
			})
				.then((res) => {
					if (res) {
						console.log(res);
						return res.json();
					}
				})
				.then((data) => {
					console.log(data);
					if (data) {
						setNickname(data.nickname);
						setName(data.name);
						setGender(data.gender);
						setPhone(data.phone);
						setProfileMessage(data.profileMessage);
						setLoginId(data.loginId);
						const convertedDate = formatDateToYYYYMMDD(data.birth);
						setBirth(convertedDate);
						setId(data.id);
						setEmail(data.email);
					}
				});
		}
	}, [isLogin]);

	const handleNameInputChange = (e) => {
		setName(e.target.value);
	};

	const handleNicknameInputChange = (e) => {
		setNickname(e.target.value);
    setNicknameFlg(false);
	};

	const handleEmailInputChange = (e) => {
		setEmail(e.target.value);
    setEmailFlg(false);
    setAuthenticationFlg(false);
	};

	// 이메일 형식 검증
	const isValidEmail = (email) => {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(email);
	};

	//이메일 발송
	const handleSendEmail = async () => {
		console.log("ssssss");

		getCode(emailRef.current.value);
	};

	// 이메일 보내는 버튼
	const handleEmailSendClick = () => {
		let email = emailRef.current.value;
		if (isValidEmail(email)) {
			setEmailMessage(
				<span style={{ color: "#2acf7dc4" }}>
					{email}으로
					<br />
					인증메일을 보내드렸습니다.
				</span>,
			);
			handleSendEmail();
		} else {
			setEmailMessage(
				<span style={{ color: "red" }}>
					알맞은 이메일 형식을 입력해주세요.
				</span>,
			);
		}
	};
	// 이메일 인증번호 관련
	const handleCfNumberInput = (event) => {
		const inputValue = event.target.value;

		if (!/^[0-9]+$/.test(inputValue)) {
			setCfNumberMessage(
				<span style={{ color: "red" }}>숫자만 입력해주세요!</span>,
			);
		} else if (inputValue.length !== 6) {
			setCfNumberMessage(
				<span style={{ color: "red" }}>인증번호 6자리를 입력해주세요.</span>,
			);
		} else {
			setCfNumberMessage(
				<span style={{ color: "#2acf7d" }}>
					인증번호 6자리를 입력하였습니다.
				</span>,
			);
		}

		setCfNumber(inputValue);
	};
	const handleCheckCode = async (e) => {
		e.preventDefault();
		const response = await checkCode(emailRef.current.value, cfNumber);
		console.log("res: ", response);
		if (response.check == true) {
			authenticationRef.current.disabled = true;
			setCfNumberMessage(
				<span style={{ color: "#2acf7d" }}>인증완료 되었습니다.</span>,
			);
			setAuthenticationFlg(true);
		} else {
			// 이거 작동 안함 수정 요청
			setCfNumberMessage(
				<span style={{ color: "red" }}>
					인증번호가 일치하지 않거나 만료 되었습니다.
				</span>,
			);
		}
	};
	//핸드폰 번호 숫자 입력만 가능하게
	const handleNumberInput = (event) => {
		const inputValue = event.target.value;

		const numericValue = inputValue.replace(/\D/g, "");
		if (numericValue.length <= 11) {
			setPhone(numericValue);
		}
	};
	//생년월일 숫자 입력만 가능하게
	const handleBirthInput = (event) => {
		const inputValue = event.target.value;

		const numericValue = inputValue.replace(/\D/g, "");
		if (numericValue.length <= 8) {
			setBirth(numericValue);
		}
	};

	const nicknameCheckHandler = async (e) => {
		e.preventDefault();

		const nickname = nicknameRef.current.value;

		const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
		if (!nickname) {
			Swal.fire({
				icon: "success",
				title: "중복 검사", // Alert 제목
				text: "닉네임을 입력해주세요",
				width: 300,
			});
			return;
		} else {
			fetch(`api/nicknameCheck?nickname=${encodeURIComponent(nickname)}`, {
				method: "GET",
				headers: {
					"Content-Type": jsonContent,
				},
			})
				.then((response) => {
					if (response.ok) {
						return response.text();
					} else {
						throw new Error("이미 사용 중인 닉네임입니다.");
					}
				})
				.then((message) => {
					nicknameRef.current.disabled = true;
					setNicknameFlg(true);
					Swal.fire({
						icon: "success",
						title: "중복 검사", // Alert 제목
						text: message,
						width: 300, // Alert 내용
					});
				})
				.catch((error) => {
					Swal.fire({
						icon: "error",
						title: "중복 검사", // Alert 제목
						text: error,
						width: 300, // Alert 내용
					});
				});
		}
	};

	const emailCheckHandler = async (e) => {
		e.preventDefault();

		const email = emailRef.current.value;

		const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
		if (!email) {
			Swal.fire({
				icon: "success",
				title: "중복 검사", // Alert 제목
				text: "이메일을 입력해주세요",
				width: 300,
			});
			return;
		} else {
			fetch(`api/emailCheck?email=${encodeURIComponent(email)}`, {
				method: "GET",
				headers: {
					"Content-Type": jsonContent,
				},
			})
				.then((response) => {
					if (response.ok) {
						return response.text();
					} else {
						throw new Error("이미 사용 중인 이메일입니다.");
					}
				})
				.then((message) => {
					emailRef.current.disabled = true;
					setEmailFlg(true);
					Swal.fire({
						icon: "success",
						title: "중복 검사", // Alert 제목
						text: message,
						width: 300, // Alert 내용
					});
				})
				.catch((error) => {
					Swal.fire({
						icon: "error",
						title: "중복 검사", // Alert 제목
						text: error,
						width: 300, // Alert 내용
					});
				});
		}
	};
  //프로필 사진 업로드
  const onUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    }
  };

  //유저 정보 업데이트 제출
	const submitHandler = async (e) => {
		e.preventDefault();

		if (!nicknameFlg) {
			Swal.fire({
				icon: "warning",
				title: "중복 검사",
				text: "닉네임 중복 검사를 완료하십시오.",
				width: 300,
			});
		} else if (!emailFlg) {
			Swal.fire({
				icon: "warning",
				title: "중복 검사", // Alert 제목
				text: "이메일 중복 검사를 완료해주세요.",
				width: 300,
			});
		} else if (!authenticationFlg) {
			Swal.fire({
				icon: "warning",
				title: "인증", // Alert 제목
				text: "이메일 인증을 완료해주세요.",
				width: 300,
			});
		} else {
			const name = nameRef.current.value;
			const phone = phoneRef.current.value;
			const birth = new Date(Date(birthRef.current.value))
				.toISOString()
				.split("T")[0];
			const profileMessage = profileMessageRef.current.value;

			const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

			console.log(birth);
			fetch(`api/update/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": jsonContent,
				},
				body: JSON.stringify({
					email: email,
					nickname: nickname,
					name: name,
					phone: phone,
					birth: birth,
					gender: gender,
					profileMessage: profileMessage,
				}),
			}).then((res) => {
				if (res.status !== 200) {
					return Swal.fire({
						icon: "error",
						title: "유저 정보 수정", // Alert 제목
						text: "유저 정보 수정에 실패하였습니다.",
						width: 300, // Alert 내용
					});
				}
				Swal.fire({
					icon: "success",
					title: "유저 정보 수정", // Alert 제목
					text: "유저 정보 수정에 성공하였습니다.",
					width: 300, // Alert 내용
				});
				navigate("/mypage", true);
			});
		}
	};
	return (
		<div>
			<section className="change-info">
				<h1>정보수정</h1>
				<div className="change-info-inner">
					<form className="change-info-place" onSubmit={submitHandler}>
						<div className="id-place place">
							<div className="id-subject subject">
								<p>아이디</p>
							</div>
							<div className="input-box input-id">
								<input
									type="text"
									className="input-kind id-input"
									value={loginId}
									disabled
								/>
								<i className="bi bi-person-fill-check"></i>
							</div>
						</div>
						<div className="email-place place">
							<div className="email-subject subject">
								<p>이메일</p>
								<input
									type="button"
									value="중복검사"
									onClick={emailCheckHandler}
								/>
							</div>
							<div className="input-box input-email">
								<input
									type="email"
									className="input-kind email-input"
									placeholder="해당메일로 인증번호를 보냅니다."
									value={email}
									ref={emailRef}
									onChange={handleEmailInputChange}
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
								곧 이메일로 인증번호가 발송됩니다.
							</span>
						</div>
						<div className="cfnumber-place place">
							<div className="cfnumber-subject subject">
								<p>인증번호</p>
								<input
									type="button"
									value="인증번호 확인"
									onClick={handleCheckCode}
								/>
							</div>
							<div className="input-box input-cfnumber">
								<input
									type="text"
									className="input-kind cfnumber-input"
									placeholder="메일로 보낸 인증번호를 입력하세요."
									ref={authenticationRef}
									onChange={handleCfNumberInput}
									value={cfNumber}
								/>
								<i className="bi bi-send-fill"></i>
							</div>
							<span className="input-cfnumber-text">{cfNumberMessage}</span>
						</div>
						<div className="nick-name-place place">
							<div className="nick-subject subject">
								<p>닉네임</p>
								<input
									type="button"
									value="중복검사"
									onClick={nicknameCheckHandler}
								/>
							</div>
							<div className="input-box input-nickname">
								<input
									type="text"
									className="input-kind nick-input"
									placeholder="사용하실 닉네임을 입력해주세요."
									value={nickname}
									ref={nicknameRef}
									onChange={handleNicknameInputChange}
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
									value={name}
									ref={nameRef}
									onChange={handleNameInputChange}
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
									onChange={handleNumberInput}
									value={phone}
									ref={phoneRef}
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
											value="M"
                      checked={gender === "M"} // Check if gender is "M"
                      onChange={() => setGender("M")}
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
                      checked={gender === "F"} // Check if gender is "F"
                      onChange={() => setGender("F")}
										/>
										<p>여성</p>
									</label>
								</div>
							</div>
						</div>
						<div className="user-profile-place place">
							<div className="user-profile-subject subject">
								<p>프로필 이미지</p>
							</div>
							<div className="user-profile">
              {imageSrc && <img src={imageSrc} alt="Uploaded" />}
							</div>
							<div className="upload-profile-img">
								<input
									type="file"
									className="upload-profile-img-btn"
                  accept="image/*"
                  onChange={onUpload}
									
								></input>
							</div>
						</div>
						<div className="introduce-place place">
							<div className="introduce-subject subject">
								<p>자기소개</p>
							</div>
							<textarea
								cols="20"
								rows="5"
								value={profileMessage}
								ref={profileMessageRef}
							></textarea>
						</div>

						<div className="change-info-complete-btn">
							<button className="change-info-btn" onClick={submitHandler}>
								수정완료
							</button>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}

export default ChangeInfo;
