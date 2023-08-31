import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../store/modules/user";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useLayoutEffect, useCallback } from "react"; // eslint-disable-line no-unused-vars
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import "../css/header.css";
import "../script/custom.js";
import "../css/variables.css";
import "../css/total.css";

function Header({ userInfo }) {
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const cookieToken = cookies.token;

  useEffect(() => {
    if (!cookieToken) {
      const accessToken = new URL(window.location.href).searchParams.get(
        "accessToken"
      );
      if (accessToken) {
        const expireTime = new URL(window.location.href).searchParams.get(
          "accessTokenExpireIn"
        );
        const expireTimeDate = new Date(Number(expireTime));

        setCookie("token", accessToken, { expires: expireTimeDate, path: "/" });
        setIsLogin(true); // 상태 업데이트를 여기서만 수행
      }
    } else {
      setIsLogin(true); // 토큰이 이미 있는 경우에도 상태 업데이트
    }
  }, [cookieToken, setCookie]);

  // if (cookies.token != "undefined") {
  // 	setIsLogin(true);
  // } else {
  // 	setIsLogin(false);
  // }

  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  useEffect(() => {
    if (isLogin && cookies.token) {
      fetch("/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": jsonContent,
          Authorization: "Bearer " + cookies.token,
        },
      })
        .then((res) => {
          if (res) {
            return res.json();
          }
        })
        .then((data) => {
          setNickname(data.nickname)
          dispatch(
            userActions.loginSaveAPI(
              data.id,
              data.nickname,
              data.loginId,
              data.status,
              data.name,
              data.email,
              data.gender,
              data.phone,
              data.birth,
              data.profileMessage,
              isLogin
            )
          );
        });
    } 
  }, [isLogin, cookies]);

  const handleLogout = (e) => {
    e.preventDefault();
		console.log("로그아웃")
    Swal.fire({
      icon: "success",
      title: "로그아웃",
      text: "로그아웃 완료",
      width: 360,
    });
    removeCookie("token");
    setIsLogin(false);
    navigate("/", true);
  };

  const handleNotLogin = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "로그인",
      text: "로그인이 필요한 서비스입니다!",
      width: 360, 
    });
		navigate("/login")
  };
  return (
    <div>
      <header>
        <div className="header-inner">
          <div className="header-hamburger">
            <input type="checkbox" id="trigger" />
            <label htmlFor="trigger">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <div className="side-var">
              <div className="login-area">
                <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                {!isLogin && <Link to="/login">로그인</Link>}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                {isLogin && (
                  <Link to="/myPage">
                    {nickname ? `${nickname} 님` : "(임시닉네임)"}
                  </Link>
                )}
              </div>
              <div className="categorys">
                <div className="category-title">
                  <div className="category-content">
                    <i className="bi bi-megaphone-fill"></i>
                    <Link to ="/board/N">공지사항</Link>
                  </div>
                </div>
                <div className="category-title">
                  <div className="category-content">
                    <i className="fa fa-comment" aria-hidden="true"></i>
                    {isLogin ? (
                      <Link to={"/chat/room/list2"}>채팅하기</Link>
                    ) : (
                      <Link to ="/chat/room/list/:roomId" onClick={handleNotLogin}>
                        채팅하기
                      </Link>
                    )}
                  </div>
                </div>
                <div className="category-title">
                  <div className="category-content">
                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    <Link to={"/calendar"}>일정</Link>
                  </div>
                </div>
                <div className="category-title category-comu">
                  <div className="category-content">
                    <i className="fa fa-users" aria-hidden="true"></i>
                   <Link to="/board/C">커뮤니티</Link>
                  </div>
                </div>
                <div className="category-sub">
                  <div className="category-content">
                    <i className="fa fa-coffee" aria-hidden="true"></i>
                    <Link to="/board/C">커피한잔할래요?</Link>
                  </div>
                </div>
                <div className="category-sub">
                  <div className="category-content">
                    <i className="fa fa-plane" aria-hidden="true"></i>
                    <Link to="/board/T">여행같이갈래요?</Link>
                  </div>
                </div>
                <div className="category-sub">
                  <div className="category-content">
                    <i className="fa fa-cutlery" aria-hidden="true"></i>
                    <Link to="/board/F">식사같이할래요?</Link>
                  </div>
                </div>
                <div className="category-sub">
                  <div className="category-content">
                    <i className="fa fa-glass" aria-hidden="true"></i>
                    <Link to="/board/A">술한잔할래요?</Link>
                  </div>
                </div>
                <div className="category-title">
                  <div className="category-content">
                    <i className="bi bi-compass-fill"></i>
                    <Link to="/kakaomap">여행지 추천</Link>
                  </div>
                </div>
                {isLogin && (
                  <div className="category-title">
                    <div className="category-content">
                      <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                      <Link to="#" onClick={handleLogout}>
                        로그아웃
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="header-white-space"></div>
            </div>
          </div>
          <div className="logo-area">
            <Link to={"/"}>
              <img src={require("../images/header-logo.png")} alt="로고이미지" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
