import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { useCookies } from 'react-cookie'; 
import Swal from 'sweetalert2';

import "../css/header.css";
import "../script/custom.js";
import '../css/variables.css';
import '../css/total.css';

function Header() {
	const [cookies, removeCookie] = useCookies(['token']);
	const [nickname, setNickname] = useState('');// eslint-disable-line no-unused-vars
	let isLogin = false;
	const navigate = useNavigate();

	if(cookies.token != 'undefined'){
		isLogin = true;
	} else {
		isLogin = false;
	}

	const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
	useEffect(() => {
		console.log("cookies"+cookies);
		console.log("cookies token : "+cookies.token);
		if(isLogin){
			fetch('/api/user/me', {
				method: 'GET',
				headers: {
					"Content-Type" : jsonContent,
					"Authorization" : "Bearer "+ cookies.token,
				}
			})
			.then(res => {
				if(res){
					console.log(res);
					return res.json();
				}
			})
			.then(data => {
        console.log(data);
        if(data){
          setNickname(data.nickname);
        }
      })
		}
	}, [isLogin]);
 
	const handleLogout = ( e ) => {
		e.preventDefault();		Swal.fire({
			icon : 'success',
			title : '로그아웃',         // Alert 제목
			text : '로그아웃 완료',
			width: 300,  // Alert 내용 
		});
		removeCookie('token');
		navigate("/", )
	}
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
								{!isLogin && <Link to='/login'>로그인</Link>}
								<i className="fa fa-angle-right" aria-hidden="true"></i>
								{isLogin && <Link to='/myPage'> {nickname} 님 </Link>}
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
										<a href="#">채팅하기</a>
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
								{isLogin && <div className="category-title">
									<div className="category-content">
										<i className="fa fa-user-circle-o" aria-hidden="true"></i>
										<a href="#" onClick={handleLogout}>로그아웃</a>
									</div>
								</div>}
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
