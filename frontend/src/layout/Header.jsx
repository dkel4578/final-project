import { Link } from 'react-router-dom';

import "../css/header.css";
import "../script/custom.js";
import '../css/variables.css';
import '../css/total.css';

function Header() {
 
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
								<Link to='/login'>로그인</Link>
								<i className="fa fa-angle-right" aria-hidden="true"></i>
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
								<div className="category-title">
									<div className="category-content">
										<i className="fa fa-user-circle-o" aria-hidden="true"></i>
										<a href="#">마이페이지</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="logo-area">
						<a href="#">
							<img src="../images/header-logo.png" alt="로고이미지" />
						</a>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
