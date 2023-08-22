import React from 'react'; // eslint-disable-line no-unused-vars
import '../css/total.css';
import '../css/chat-list-room.css';
import '../css/variables.css';
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import "../script/chat-list-room.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";

function ChatListRoom() {
  return (
    <div>
      <section className="chat-list-room">
        <div className="chat-create-modal">
          <div className="chat-create-modal-contents">
            <i className="fa fa-times modal-close" aria-hidden="true"></i>
            <div className="chat-create-modal-content">
              <div className="chating-room-name chat-list-modal-content">
                <input type="button" value="채팅방 이름" className="chating-room-name-btn" />
                <i className="bi bi-chat-text-fill"></i>
              </div>
              <div className="chating-room-create chat-list-modal-content">
                <input type="button" value="채팅방 생성" className="chating-room-create-btn" />
                <i className="bi bi-house-add-fill"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-list-room-inner">
          <div className="chat-list-room-title">
            <i className="bi bi-chat-fill chat"></i>
            <h1>채팅방</h1>
            <i className="bi bi-plus-circle-fill plus"></i>
          </div>
          <div className="chat-list-room-place">
            <ul className="chat-listes">
              <li className="chat-list-single">
                <div className="chat-user-profile">
                  <img src="../images/user-profile-test.jpg" alt="프로필" />
                </div>
                <div className="chat-user-opponent">
                  <p>스피드왕조닦달</p>
                  <p>생존전문가김병철</p>
                </div>
                <div className="chat-sub">
                 안녕하세요 적당히 바람이 시원해 기분이 너무좋아요 유후
                </div>
                <div className="chat-head-count">10/10</div>
                <div className="chat-list-icons">
                  <i className="bi bi-share-fill share">
                    <div className="share-box">공유하기</div>
                  </i>
                  <i className="bi bi-box-arrow-right chat-leave"></i>
                </div>
              </li>
              {/* 다른 채팅방 정보도 마찬가지로 구성 */}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatListRoom;