import React from "react"; // eslint-disable-line no-unused-vars
// import "../css/total.css";
// import "../css/manner-score.css";
// import "../css/variables.css";
// import "../script/manner-score.js";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "font-awesome/css/font-awesome.min.css";
// import "../script/custom.js";

const MannerScore = () => {
	return (
		<section className="manner-score">
			<div className="manner-score-modal active">
				<div className="manner-score-modal-content">
					<i className="fa fa-close manner-modal-close" aria-hidden="true"></i>
					<div className="manner-score-modal-title">
						<i className="bi bi-clipboard-check"></i>
						<h1>매너점수 체크</h1>
					</div>
					<div className="manner-score-modal-check">
						<label htmlFor="so-kind">
							<input
								type="radio"
								id="so-kind"
								className="manner-check-box"
								name="manner-radio"
							/>
							<i className="manner-check"></i>
							<span>너무 친절했어요</span>
						</label>
						<label htmlFor="so-fun">
							<input type="radio" id="so-fun" className="manner-check-box" name="manner-radio" />
							<i className="manner-check"></i>
							<span>이야기하는 것이 재밌었어요</span>
						</label>
						<label htmlFor="great-talk">
							<input
								type="radio"
								id="great-talk"
								className="manner-check-box"
								name="manner-radio"
							/>
							<i className="manner-check"></i>
							<span>시간가는 줄 모르고 떠들었어요</span>
						</label>
						<label htmlFor="later-meet">
							<input
								type="radio"
								id="later-meet"
								className="manner-check-box"
								name="manner-radio"
							/>
							<i className="manner-check"></i>
							<span>다음에 또 만나고 싶어요</span>
						</label>
						<div className="manner-star-rating">
							<i className="manner-star active bi bi-star-fill"></i>
							<i className="manner-star bi bi-star-fill"></i>
							<i className="manner-star bi bi-star-fill"></i>
							<i className="manner-star bi bi-star-fill"></i>
							<i className="manner-star bi bi-star-fill"></i>
						</div>
					</div>
					<div className="review-complete-place">
						<input
							type="button"
							value="리뷰작성"
							className="review-complete-btn"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MannerScore;
