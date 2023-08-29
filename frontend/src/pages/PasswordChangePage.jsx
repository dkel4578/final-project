import React, { useState, useRef, useContext, useEffect } from "react"; // eslint-disable-line no-unused-vars
import axios from "axios"; // eslint-disable-line no-unused-vars
import { useNavigate, Link } from "react-router-dom"; // eslint-disable-line no-unused-vars
import "../css/password-change.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";

async function getCode(email) {
  await axios
    .post("/api/find-password?email=" + email, {
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

async function checkEmail(email, loginId) {
  console.log("email: ", email);

  return await axios
    .get(
      "/api/user/checkLoginIdByEmail?loginId=" + loginId + "&email=" + email,
      {
        email: email,
        loginId: loginId,
      }
    )
    .then((response) => {
      console.log(response);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error); //오류발생시 실행
    });
}

const findId = async (email) => {
  // eslint-disable-line no-unused-vars
  // console.log("email: ",email);

  // let myId = await findId(email);

  return await axios
    .get("/api/user/findLoginId?email=" + email, {
      email: email,
    })
    .then((response) => {
      console.log(response);
      console.log("axios: ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error); //오류발생시 실행
    });
};

function PasswordChangePage() {
  const [email, setEmail] = useState(); // eslint-disable-line no-unused-vars

  const [code, setCode] = useState(); // eslint-disable-line no-unused-vars

  const [check, setCheck] = useState(null); // eslint-disable-line no-unused-vars

  const [loginId, setLoginId] = useState(null); // eslint-disable-line no-unused-vars

  const [password, setPassword] = useState(null); // eslint-disable-line no-unused-vars

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleLoginIdChange = (e) => {
    setLoginId(e.target.value);
  };

  const handleSendEmail = async (e) => {
    // eslint-disable-line no-unused-vars
    e.preventDefault();
    const response = await checkEmail(email, loginId);
    console.log("response", response);
    if (!response.isIdCorrect) {
      $(".after-send-email")
        .css("color", "red")
        .html(loginId + "은<br>존재하지 않는 아이디입니다.");
    } else if (!response.isEmailCorrect) {
      $(".after-send-email")
        .css("color", "red")
        .html(email + "은<br>일치하지 않는 메일입니다.");
    } else {
      $(".after-send-email")
        .css("color", "#2acf7dc4")
        .html(email + "으로<br>인증메일을 보내드렸습니다.");
      getCode(email);
    }
  };

  const handleCheckCode = async (e) => {
    // eslint-disable-line no-unused-vars
    e.preventDefault();
    // checkCode(email,code);

    const response = await checkCode(email, code);
    console.log("res: ", response);
    setCheck(response.check);
    console.log(check);
    let userId; // eslint-disable-line no-unused-vars

    if (email === "" || email === null) {
      setPassword("Email을 입력해주세요.");
    } else if (code === "" || code === null) {
      setPassword("인증 번호를 입력해주세요.");
    } else if (!check) {
      setPassword("유효기간이 만료 되었거나 인증번호가 일치하지 않습니다.");
    }
    // else{
    // }

    $(document).ready(function () {
      // 버튼 클릭 시 이벤트 처리
      $(".password-change-btn a").click(function () {
        // 인증번호 입력값 가져오기
        var cfNumberInput = $(".cf-number-input-text").val().trim();
        // 인증번호가 빈 값인 경우
        if (cfNumberInput === "") {
          // SweetAlert 팝업 창 띄우기
          Swal.fire({
            title: "알림",
            text: "인증을 완료해주십시오",
            width: 360, // 폭을 원하는 값으로 조정 (단위: px)
          });
        } else if (check == true) {
          Swal.fire({
            title: "알림",
            text: "인증 완료!",
            width: 360, // 폭을 원하는 값으로 조정 (단위: px)
          });
        } else if (cfNumberInput !== $(".cf-number-input-text").value) {
          Swal.fire({
            title: "알림",
            text: "인증 번호를 다시 확인해주세요",
            width: 360, // 폭을 원하는 값으로 조정 (단위: px)
          });
        }
      });
    });

    // loginId
  };

  return (
    <>
      <section className="password-change">
        <div className="password-change-inner">
          <h1 className="password-change-title">비밀번호 변경</h1>
          <form>
            <fieldset>
              <div className="password-change-input-id">
                <input
                  type="text"
                  placeholder="아이디"
                  onChange={handleLoginIdChange}
                />
                <i className="bi bi-person-fill-check"></i>
              </div>
              <div className="password-change-input-cf-email">
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  className="email-input-cf-text"
                  onChange={handleEmailChange}
                />
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div className="password-change-input-cf-number-delevery">
              <input
                  type="button"
                  value="인증번호 발송"
                  onClick={handleSendEmail}
                />
              </div>
              <div className="password-change-input-cf-number">
                <input
                  type="text"
                  placeholder="인증번호"
                  className="cf-number-input-text"
                  onChange={handleCodeChange}
                />
                <i className="bi bi-envelope-check-fill"></i>

              </div>
              <p className="after-send-email">
                메일주소 작성 시 인증번호를 보내드리겠습니다.
              </p>
            </fieldset>
            <div className="password-change-btn">
              <Link to ="/passwordChangeComplete" onClick={handleCheckCode}>
                비밀번호 변경
              </Link>
            </div>
          </form>
          <div className="password-change-user-find">
            <Link to ="/signup">회원가입</Link>
            <Link to ="/findId">아이디 찾기</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default PasswordChangePage;
