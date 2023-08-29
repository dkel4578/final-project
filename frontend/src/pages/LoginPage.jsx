import "../css/login.css"
import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../store/modules/user";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/login.js";
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import "../script/custom.js";

function LoginPage() {
  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.user.user);
  // console.log('userInfo', userInfo);

  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies(['token']);
  
  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginId = loginIdRef.current.value;
    const password = passwordRef.current.value;
  
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          "Content-Type": jsonContent,
        },
        body: JSON.stringify({
          loginId: loginId,
          password: password
        })
      });
      // if (response.status !== 200) {
      //   throw new Error("로그인 실패");
      // }
      const data = await response.json();
      if (data) {
        if(data.error){
          return  Swal.fire({
            icon: "error",
            title: "로그인",
            text: data.error,
            width: 360,
          });
        }
        removeCookie('token');
        const expireTimeDate = new Date(Number(data.accessTokenExpireIn));
        setCookie('token', data.accessToken, { expires: expireTimeDate });
        console.log(cookies);
  
        // dispatch(userActions.loginSaveAPI(data.id, data.nickname));
  
        navigate('/', true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "로그인",
        text: error.message,
        width: 360,
      });
    }
  }
  return (
    <>
    <title>로그인</title>
    <section className="login-place">
      <div className="find-password-modal">
        <fieldset>
          <i className="fa fa-times modal-close" aria-hidden="true"></i>
          <legend>비밀번호 찾기</legend>
          <p>입력하신 이메일로 임시 비밀번호가 전송됩니다.</p>
          <div className="email-send">
            <input type="email" placeholder="email"/>
          </div>
          <button className="send-pw">비밀번호 발송</button>
        </fieldset>
      </div>
      <div className="login-inner">
        <Link to = "/" className="login-title-font">
         같이갈래?
        </Link>
        <form onSubmit={submitHandler}>
          <fieldset>
            <div className="input-login-id">
              <input type="text" placeholder="ID" required ref={loginIdRef}/>
              <i className="bi bi-person-fill-check"></i>
            </div>
            <div className="input-login-pw">
              <input type="password" placeholder="password" required ref={passwordRef}/>
              <i className="bi bi-key-fill"></i>
            </div>
          </fieldset>
          <div className="login-btn">
            <button>로그인</button>
          </div>
        </form>
        <div className="btn-area">
          <img src={require("../images/google-logo.png")} alt="구글로고" className="google-logo"/>
          <Link to = {`${process.env.REACT_APP_API_GATEWAY_HOST}/oauth2/authorization/google`} className="google-login-btn">구글 이메일 로그인</Link>
          <p className="forgot-password">비밀번호를 잊으셨나요?</p>
        </div>
        <div className="user-find">
          <Link to="/signup">회원가입</Link>
          <Link to="/findId">아이디 찾기</Link>
          <Link to="/passwordChange">비밀번호 변경</Link>
        </div>
      </div>
    </section>
    </>
  )
}

export default LoginPage
