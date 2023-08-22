import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/slide-link-page.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";

function CoffeeEvent() {
	return (
		<section className="post-content">
			<div className="post-content-inner">
				<div className="post-title">공지) 스타벅스 커피이벤트</div>
				<div className="post-main-contents">
					<div className="post-main-content">
						<img src="../images/slide-banner1.png" alt="" />
						<p>
							안녕하세요. 가치있는여행 같이갈래? 입니다. 이번 같이갈래?
							런칭이벤트로 회원가입 한 인원 중
							<br />
							<span>선착순 10명에게</span> 휴대폰번호로 스타벅스 기프티콘
							증정이벤트를 진행합니다. 이벤트는 증정이 완료되는대로 종료되오니
							서둘러 이벤트 참여부탁드리며, 여러분들의 많은참여 바랍니다.
							감사합니다.
						</p>
					</div>
					<div className="post-main-content-btns">
						<input type="button" className="post-modify-btn" value="수정" />
						<input type="button" className="post-delete-btn" value="삭제" />
					</div>
				</div>

				{/* post-user-info */}
				<div className="post-user-info">
					<div className="post-user-img">
						<img src="../images/master-profile.png" alt="" />
					</div>
					<div className="post-user-information">
						<div className="post-users-infos post-user-nick-name">
							<p>닉네임</p>
							<p>운영자</p>
						</div>
						<div className="post-users-infos post-user-gender">
							<p>성별</p>
							<p>남성</p>
						</div>
						<div className="post-users-infos post-user-manner">
							<p>매너지수</p>
							<p>5.0</p>
						</div>
						<div className="post-users-infos post-user-introduce"></div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CoffeeEvent;
