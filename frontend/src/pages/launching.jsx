import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/slide-link-page.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "../script/post-content.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";

const Launching = () => {
	return (
		<div>
			<section className="post-content">
				<div className="user-report-modal">
					<div className="user-report-modal-contents">
						<h2>신고하기</h2>
						<i className="fa fa-times modal-close" aria-hidden="true"></i>
						<fieldset>
							<label htmlFor="doubling-the-post">
								<input type="radio" id="doubling-the-post" name="report" />
								<span>게시글 / 댓글 도배</span>
							</label>
							<label htmlFor="obscene-posts">
								<input type="radio" id="obscene-posts" name="report" />
								<span>음란성 게시글 / 댓글 작성</span>
							</label>
							<label htmlFor="abusive-comments">
								<input type="radio" id="abusive-comments" name="report" />
								<span>욕설 / 혐오 발언 게시글 / 댓글 작성</span>
							</label>
							<label htmlFor="advertising-post">
								<input type="radio" id="advertising-post" name="report" />
								<span>광고성 게시글 / 댓글 작성</span>
							</label>
							<label htmlFor="false-review">
								<input type="radio" id="false-review" name="report" />
								<span>허위 리뷰</span>
							</label>
						</fieldset>
						<div className="user-report-modal-btns">
							<input type="button" value="신고" />
							<input type="button" value="취소" id="user-report-modal-cancel" />
						</div>
					</div>
				</div>
				<div className="post-content-inner">
					<div className="post-title">공지 : 같이갈래? 런칭</div>
					<div className="post-main-contents">
						<div className="post-main-content">
							<img src="../images/slide-banner3.png" alt="" />
							<p>
								안녕하세요. 가치있는여행 같이갈래? 입니다. 저희 같이갈래?는 함께
								즐거운 여행을 즐길 트립메이트를 찾는 웹서비스로 해당 사이트를
								통해 만난 여행친구와 함꼐 즐거운 여행을 즐기셨으면 좋겠습니다.
								감사합니다.
							</p>
						</div>
						<div className="post-main-content-btns">
							<input type="button" className="post-modify-btn" value="수정" />
							<input type="button" className="post-delete-btn" value="삭제" />
						</div>
					</div>
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
		</div>
	);
};

export default Launching;
