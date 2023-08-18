import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'; 
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../store/modules/user";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useLayoutEffect, useCallback } from "react"; // eslint-disable-line no-unused-vars
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

import "../css/header.css";
import "../script/custom.js";
import "../css/variables.css";
import "../css/total.css";

function Header() {
	const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  console.log('userInfo', userInfo);

	const [cookies, setCookie, removeCookie] = useCookies(["token"]);
	const [nickname, setNickname] = useState("");
	const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
	const cookieToken = cookies.token;

	useEffect(() => {
		if (!cookieToken) {
			const accessToken = new URL(window.location.href).searchParams.get(
				"accessToken"
			);
			console.log("accessToken >>>>> ", accessToken)
			if (accessToken) {
				const expireTime = new URL(window.location.href).searchParams.get(
					"accessTokenExpireIn"
				);
				console.log("expireTime >>>>> ", expireTime)
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
		console.log("cookies : " + cookies);
		console.log("cookies token : " + cookies.token);
		console.log("isLogin : ", isLogin);
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
						console.log(res);
						return res.json();
					}
				})
				.then((data) => {
					console.log(data);
					if (data.nickname) {
						setNickname(data.nickname);
            dispatch(userActions.loginSaveAPI(data.id, data.nickname));
					}
				});
		} else {
			setNickname(""); // 이 부분을 추가하여 nickname을 초기화합니다.
		}
	}, [isLogin, cookies]);

	const handleLogout = (e) => {
		e.preventDefault();
		Swal.fire({
			icon: "success",
			title: "로그아웃", // Alert 제목
			text: "로그아웃 완료",
			width: 300, // Alert 내용
		});
		removeCookie("token");
		navigate("/", true);
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
								{isLogin && <Link to="/myPage"> {nickname} 님 </Link>}
							</div>
							<div className="categorys">
								<div className="category-title">
									<div className="category-content">
										<i className="bi bi-megaphone-fill"></i>
										<a href="#">공지사항</a>
									</div>
								</div>
								<div className="category-title">
									<div className="category-content">
										<i className="fa fa-comment" aria-hidden="true"></i>
										{isLogin ? <Link to={"/chat/room/list"}>채팅하기(후)</Link> : <a href="#">채팅하기(전)</a>}
									</div>
								</div>
								<div className="category-title">
									<div className="category-content">
										<i className="fa fa-calendar-o" aria-hidden="true"></i>
										<a href="#">일정</a>
									</div>
								</div>
								<div className="category-title category-comu">
									<div className="category-content">
										<i className="fa fa-users" aria-hidden="true"></i>
										<a href="#">커뮤니티</a>
									</div>
								</div>
								<div className="category-sub">
									<div className="category-content">
										<i className="fa fa-coffee" aria-hidden="true"></i>
										<a href="#">커피한잔할래요?</a>
									</div>
								</div>
								<div className="category-sub">
									<div className="category-content">
										<i className="fa fa-plane" aria-hidden="true"></i>
										<a href="#">여행같이갈래요?</a>
									</div>
								</div>
								<div className="category-sub">
									<div className="category-content">
										<i className="fa fa-cutlery" aria-hidden="true"></i>
										<a href="#">식사같이할래요?</a>
									</div>
								</div>
								<div className="category-sub">
									<div className="category-content">
										<i className="fa fa-glass" aria-hidden="true"></i>
										<a href="#">술한잔할래요?</a>
									</div>
								</div>
								{isLogin && (
									<div className="category-title">
										<div className="category-content">
											<i className="fa fa-user-circle-o" aria-hidden="true"></i>
											<a href="#" onClick={handleLogout}>
												로그아웃
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="logo-area">
						<Link to={"/"}>
							<img src="../images/header-logo.png" alt="로고이미지" />
						</Link>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
