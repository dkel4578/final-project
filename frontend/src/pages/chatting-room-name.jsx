
import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/variables.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import "../css/chatting-room-name.css";

const ChatName = () => {
  return (
    <section className="chatting-room-name">
      <div className="chatting-room-name-inner"> 
        <div className="chatting-room-name-details">
        <h1>채팅방 참가</h1>
          <div className="chatting-room-name-item">
            <div className="chatting-room-name-title">
              최종보스 최종진 레이드가실분?
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src={require('../images/kimByungcheol.png')} alt="유저프로필" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>생존전문가김병철</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src={require('../images/parkSsiPal.png')} alt="유저프로필" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>프린시팔박시팔</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src={require('../images/chaGath.png')} alt="유저프로필" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>얼음마법사차가스</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src={require('../images/joGuemMan.png')} alt="유저프로필" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>양심적도둑조금만</span>
              </div>           
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src={require('../images/speedKing.png')} alt="유저프로필" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>스피드왕조닦달</span>
              </div>           
            </div>
            <div className="chatting-room-name-btns">
              <input className="chatting-room-name-btn chatting-room-name-attend-btn" type="button" value="참가"/>
              <input className="chatting-room-name-btn chatting-room-name-exit-btn" type="button" value="취소"/>
            </div>
          </div>
          {/* <div className="chatting-room-name-item">
            <div className="chatting-room-name-title">
              최종보스 최종진 레이드가실분?
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>생존전문가김병철</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>프린시팔박시팔</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>얼음마법사차가스</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>양심적도둑조금만</span>
              </div>
            </div>
            <div className="chatting-room-name-btns">
              <input className="chatting-room-name-btn chatting-room-name-attend-btn" type="button" value="참가"/>
              <input className="chatting-room-name-btn chatting-room-name-exit-btn" type="button" value="취소"/>
            </div>
          </div> */}
          {/* <div className="chatting-room-name-item">
            <div className="chatting-room-name-title">
              최종보스 최종진 레이드가실분?
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>생존전문가김병철</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>프린시팔박시팔</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>얼음마법사차가스</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>양심적도둑조금만</span>
              </div>
            </div>
            <div className="chatting-room-name-btns">
              <input className="chatting-room-name-btn chatting-room-name-attend-btn" type="button" value="참가"/>
              <input className="chatting-room-name-btn chatting-room-name-exit-btn" type="button" value="취소"/>
            </div>
          </div> */}
          {/* <div className="chatting-room-name-item">
            <div className="chatting-room-name-title">
              최종보스 최종진 레이드가실분?
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>생존전문가김병철</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>프린시팔박시팔</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>얼음마법사차가스</span>
              </div>
            </div>
            <div className="chatting-room-name-user-profile-infos">
              <div className="chatting-room-name-user-profile">
                <img src="" alt="" />
              </div>
              <div className="chatting-room-name-user-nickname">
                <span>양심적도둑조금만</span>
              </div>
            </div>
            <div className="chatting-room-name-btns">
              <input className="chatting-room-name-btn chatting-room-name-attend-btn" type="button" value="참가"/>
              <input className="chatting-room-name-btn chatting-room-name-exit-btn" type="button" value="취소"/>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ChatName;
