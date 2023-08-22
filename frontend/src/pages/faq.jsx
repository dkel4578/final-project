import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/faq.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import "../script/faq";

function faq() {
	return (
		<div className="faq">
			<section className="faq-title-area">
				<h1>&lt;자주묻는질문들&gt;</h1>
			</section>
			<section className="faq">
				<div className="faq-inner">
					<div className="faq-container">
						<div className="faq-items">
							<div className="faq-title">아이디는 더 이상 바꿀수없나요?</div>
							<div className="faq-content">
								<p>
									네 아이디는 변경이 불가능하기에 한번 결정하실때
									신중하셔야합니다.
								</p>
								<div className="faq-modify-btns ">
									<input
										type="button"
										value="수정"
										className="faq-modify-btn faq-btn"
									/>
									<input type="button" value="삭제" className="faq-delte-btn faq-btn" />
								</div>
							</div>
						</div>
						<div className="faq-items">
							<div className="faq-title">비밀번호는 어떻게 찾나요?</div>
							<div className="faq-content">
								<p>
									로그인 시 아래 표기되어있는 비밀번호 찾기를 누르시면 됩니다.
								</p>
								<div className="faq-modify-btns ">
									<input
										type="button"
										value="수정"
										className="faq-modify-btn faq-btn"
									/>
									<input type="button" value="삭제" className="faq-delte-btn faq-btn" />
								</div>
							</div>
						</div>
						<div className="faq-items">
							<div className="faq-title">인증메일이 안와요</div>
							<div className="faq-content">
								<p>
									서버에 전송되기까지 시간이 소요될수있어 1~2분간 기다려보시고
									그래도 오지않을경우 재시도해주시면 됩니다.
								</p>
								<div className="faq-modify-btns ">
									<input
										type="button"
										value="수정"
										className="faq-modify-btn faq-btn"
									/>
									<input type="button" value="삭제" className="faq-delte-btn faq-btn" />
								</div>
							</div>
						</div>
						<div className="faq-items">
							<div className="faq-title">닉네임은 변경가능한가요?</div>
							<div className="faq-content">
								<p>
									네 닉네임은 중복되지않는 선에서 언제든 변경이 가능합니다.
								</p>
								<div className="faq-modify-btns ">
									<input
										type="button"
										value="수정"
										className="faq-modify-btn faq-btn"
									/>
									<input type="button" value="삭제" className="faq-delte-btn faq-btn" />
								</div>
							</div>
						</div>
						<div className="faq-items">
							<div className="faq-title">같은번호로 중복가입이 되나요?</div>
							<div className="faq-content">
								<p>
									핸드폰번호는 고유한 번호로 인정되어 1개의 번호는 1개의
									아이디만 가질수있습니다.
								</p>
								<div className="faq-modify-btns ">
									<input
										type="button"
										value="수정"
										className="faq-modify-btn faq-btn"
									/>
									<input type="button" value="삭제" className="faq-delte-btn faq-btn" />
								</div>
							</div>
						</div>
						<div className="faq-items">
							<div className="faq-title">이름을 개명했는데 변경될까요?</div>
							<div className="faq-content">
								네 이름을 개명하였어도 회원정보 수정에서 변경하신 이름을
								기입해주시면 됩니다.
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default faq;
