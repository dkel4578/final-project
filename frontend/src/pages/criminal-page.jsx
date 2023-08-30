import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/slide-link-page.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import { Link } from "react-router-dom";

function CriminalPage() {
  return (
    <div className="criminal-page">
      <section className="slide-page">
        <div className="slide-page-inner">
          <div className="slide-page-title">
            공지) 여행중 성범죄 불법입니다
          </div>
          <div className="slide-page-main-contents">
            <div className="slide-page-main-content">
            <img src={require("../images/slide-banner2.png")} alt="범죄배너" />
              <p>
                안녕하세요. 가치있는여행 같이갈래? 입니다. 여행도중 성희롱
                성폭행 등 성범죄 행위는
                <br />
                <span>
                  엄연한 불법이며, 제56조 제1항 제1호 내지 제11호, 제13호 내지
                  제17호 중 각 성인대상 성범죄 중 성폭력범죄의 처벌 등에 관한
                  특례법 제12조의 범죄로 헌법에 위반 되는 행위입니다.
                </span>
                <br />
                만일 성범죄에 직면하는 경우 지체없이 경찰에 바로 신고부탁드리며,
                같이갈래? 또한 각 지역 경찰서와 협력하여 즉각적인 처벌에
                힘쓰겠습니다. 감사합니다.
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
}

export default CriminalPage;
