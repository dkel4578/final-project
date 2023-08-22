import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/post-content.css";
import "../css/variables.css";
import "../script/post-content.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";
import { Link } from 'react-router-dom';


const PostContent = () => {
	return (
		<section className="post-content">
			<div className="user-report-modal">
				<div className="user-report-modal-contents">
					<h2 className="user-report-title">신고하기</h2>
					<i className="fa fa-times modal-close" aria-hidden="true"></i>
					<fieldset>
						<label htmlFor="doubling-the-post">
							<input type="radio" id="doubling-the-post" name="report" />
							<span>게시글 / 댓글 도배</span>
						</label>
						<label htmlFor="obscene-posts">
							<input type="radio" id="obscene-posts" name="report"></input>
							<span>음란성 게시글 / 댓글 작성</span>
						</label>
						<label htmlFor="abusive-comments">
							<input type="radio" id="abusive-comments" name="report"></input>
							<span>욕설 / 혐오 발언 게시글 / 댓글 작성</span>
						</label>
						<label htmlFor="advertising-post">
							<input type="radio" id="advertising-post" name="report"></input>
							<span>광고성 게시글 / 댓글 작성</span>
						</label>
						<label htmlFor="false-review">
							<input type="radio" id="false-review" name="report"></input>
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
				<div className="post-title">글제목 데이터로 불러오기</div>
				<div className="post-main-contents">
					<div className="post-main-content-detail">
						<p>
							내용 데이터로 받아오기 Lorem ipsum dolor, sit amet consectetur
							adipisicing elit. Officia sequi quam, animi distinctio, dicta
							doloremque esse iusto eaque sed non reprehenderit accusantium
							dolor soluta placeat possimus maxime vero minima aut fugiat.
							Voluptates provident minima amet nulla repudiandae ex, recusandae
							laudantium? Architecto est aperiam repellat quas dolorem autem
							ipsam, dolore quia ipsa, illo blanditiis! Veritatis repudiandae,
							et aut ea, esse debitis odio quibusdam neque illum eligendi sint
							vero officiis amet eos beatae dolore excepturi tempora quod
							dolorem eveniet consequatur accusantium officia quo. Quidem sed
							distinctio mollitia rem ipsa! Iusto vitae quae quidem, aut
							consequatur, ipsa, totam qui facere quisquam facilis corrupti.
						</p>
					</div>
					<div className="post-main-content-btns">
						<Link to ="/postContentModify">
						<input
							type="button"
							className="post-modify-btn"
							value="수정"
						></input>
						</Link>
						<input
							type="button"
							className="post-delete-btn"
							value="삭제"
						></input>
					</div>
				</div>
				<div className="post-user-info">
					<div className="post-user-img">
						<img src="" alt=""></img>
					</div>
					<div className="post-user-information">
						<div className="post-users-infos post-user-nick-name">
							<p>닉네임</p>
							<p>생존전문가김병철</p>
						</div>
						<div className="post-users-infos post-user-gender">
							<p>성별</p>
							<p>남성</p>
						</div>
						<div className="post-users-infos post-user-manner">
							<p>매너지수</p>
							<p>4.3</p>
						</div>
						<div className="post-users-infos post-user-introduce"></div>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-urgent siren"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#dc143c"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M8 16v-4a4 4 0 0 1 8 0v4" />
						<path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
						<path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
					</svg>
				</div>
				<div className="post-user-comment">
					<ul className="comment-container">
						<li className="comment-container-content">
							<div className="comment-container-content-user-info">
								<div className="user-nick-name">
									<p>생존전문가김병철</p>
								</div>
								<div className="user-gender">
									<p>성별 : 남성</p>
								</div>
								<div className="user-manner">
									<p>매너점수 : 4.7</p>
								</div>
							</div>
							<div className="btnsAndtext">
								<div className="comment-container-content-main-text">
									<p>
										데이터로 가져올것 : 두 번 다시 바람 피지마 니가 매달려
										만난거잖아 어떻게 날 두고 다른 남잘 만날 수 있니 내게 더
										정말 멋진여자들 가끔은 내게 다가와 흔들릴 때도 있어 넌 몰라
										이젠 제발 정신 좀 차려
									</p>
								</div>
								<div className="comment-container-content-timeAndbtns">
									<div className="comment-time">
										<p>데이터로 시간 끌어오기</p>
									</div>
									<div className="modify-delete-btns">
										<input
											type="button"
											className="post-modify-btn"
											value="수정"
										></input>
										<input
											type="button"
											className="post-delete-btn"
											value="삭제"
										></input>
									</div>
									<div className="reply-btn">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-urgent siren2"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#dc143c"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M8 16v-4a4 4 0 0 1 8 0v4" />
											<path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
											<path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
										</svg>
										<input type="button" value="답글"></input>
									</div>
								</div>
							</div>
						</li>
						<li className="recomment-container-content">
							<div className="recomment-container-content-user-info">
								<div className="user-nick-name">
									<p>스피드왕조닦달</p>
								</div>
								<div className="user-gender">
									<p>남성</p>
								</div>
								<div className="user-manner">
									<p>매너점수 : 3.8</p>
								</div>
							</div>
							<div className="btnsAndtext">
								<div className="recomment-container-content-main-text">
									<p>
									이렇게 멋진 파란 하늘 위로
                  나르는 마법 융단을 타고
                  이렇게 멋진
                  푸른 세상 속을 나르는 우리
                  두 사람
									</p>
								</div>
								<div className="recomment-container-content-timeAndbtns">
									<div className="recomment-time">
										<p>데이터로 시간 끌어오기</p>
									</div>
									<div className="modify-delete-btns">
										<input
											type="button"
											className="post-modify-btn"
											value="수정"
										></input>
										<input
											type="button"
											className="post-delete-btn"
											value="삭제"
										></input>
									</div>
									<div className="reply-btn">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-urgent siren2"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="#dc143c"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M8 16v-4a4 4 0 0 1 8 0v4" />
											<path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
											<path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
										</svg>
										<input type="button" value="답글"></input>
									</div>
								</div>
							</div>
						</li>
						<li className="write-comment">
							<textarea className="write-comment-text"></textarea>
							<input type="button" value="답변하기"></input>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default PostContent;
