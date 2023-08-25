import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/slide-link-page.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "../script/post-content.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";
import { Link } from "react-router-dom";

const Launching = () => {
	return (
		<div>
    <section className="slide-page">
      <div className="slide-page-inner">
        <div className="slide-page-title">공지) 같이갈래? 드디어 런칭</div>
        <div className="slide-page-main-contents">
          <div className="slide-page-main-content">
            <img src="../images/slide-banner3.png" alt="" />
            <p>
								안녕하세요. 가치있는여행 같이갈래? 입니다. 저희 같이갈래?는 함께
								즐거운 여행을 즐길 트립메이트를 찾는 웹서비스로 해당 사이트를
								통해 만난 여행친구와 함꼐 즐거운 여행을 즐기셨으면 좋겠습니다.
								감사합니다.
            </p>
          </div>
          <div className="slide-page-main-content-btns">
            <Link to="postContentModify">
              <input
                type="button"
                className="slide-page-modify-btn"
                value="수정"
              />
            </Link>
            <input
              type="button"
              className="slide-page-delete-btn"
              value="삭제"
            />
          </div>
        </div>
        {/* slide-page-user-info */}
        <div className="slide-page-user-info">
          <div className="slide-page-user-img">
            <img src="../images/master-profile.png" alt="" />
          </div>
          <div className="slide-page-user-information">
            <div className="slide-page-users-infos slide-page-user-nick-name">
              <p>닉네임</p>
              <p>운영자</p>
            </div>
            <div className="slide-page-users-infos slide-page-user-gender">
              <p>성별</p>
              <p>남성</p>
            </div>
            <div className="slide-page-users-infos slide-page-user-manner">
              <p>매너지수</p>
              <p>5.0</p>
            </div>
            <div className="slide-page-users-infos slide-page-user-introduce"></div>
          </div>
        </div>
      </div>
    </section>
		</div>
	);
};

export default Launching;
