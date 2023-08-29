import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/chat-list-room.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "../script/chat-list-room.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import "../script/manner-score.js"
import { useState } from "react";

function ChatListRoom() {

  return (
    <div>
      <section className="chat-list-room">
        {/* 채팅만들기 모달 */}
        <div className="chat-create-modal">
          <div className="chat-create-modal-contents">
            <i className="fa fa-times modal-close" aria-hidden="true"></i>
            <div className="chat-create-modal-content">
              <div className="chating-room-name chat-list-modal-content">
                <input
                  type="button"
                  value="채팅방 이름"
                  className="chating-room-name-btn"
                />
                <i className="bi bi-chat-text-fill"></i>
              </div>
              <div className="chating-room-create chat-list-modal-content">
                <input
                  type="button"
                  value="채팅방 생성"
                  className="chating-room-create-btn"
                />
                <i className="bi bi-house-add-fill"></i>
              </div>
            </div>
          </div>
        </div>
        {/* 유저평가 모달 */}
        <div className='chat-user-evaluation-modal'>
          <div className='chat-user-evaluation-modal-content'>
            <div className="chat-user-evaluation-modal-content-title">
              <p>잠깐!</p>
              <p>유저에 대한 리뷰를 남겨주세요!</p>
            </div>
            <div className="chat-user-evaluation-modal-content-user-list">
              <div className="chat-user-evaluation-modal-content-user-info">
                <div className="chat-user-evaluation-modal-content-user-profile">
                  <img src="../images/slide-banner2.png" alt="" />
                </div>
                <div className="chat-user-evaluation-modal-content-user-nickname">
                  <span>스피드왕조닦달</span>
                </div>
                <div className="chat-user-evaluation-modal-content-give-star">
                  <input type="button" value="별점주기" />
                </div>
              </div>
              <div className="chat-user-evaluation-modal-content-user-info">
                <div className="chat-user-evaluation-modal-content-user-profile">
                  <img src="../images/slide-banner2.png" alt="" />
                </div>
                <div className="chat-user-evaluation-modal-content-user-nickname">
                  <span>최종보스최종진</span>
                </div>
                <div className="chat-user-evaluation-modal-content-give-star">
                  <input type="button" value="별점주기" />
                </div>
              </div>
              <div className="chat-user-evaluation-modal-content-user-info">
                <div className="chat-user-evaluation-modal-content-user-profile">
                  <img src="../images/slide-banner2.png" alt="" />
                </div>
                <div className="chat-user-evaluation-modal-content-user-nickname">
                  <span>프린시팔박시팔</span>
                </div>
                <div className="chat-user-evaluation-modal-content-give-star">
                  <input type="button" value="별점주기" />
                </div>
              </div>
              <div className="chat-user-evaluation-modal-content-user-info">
                <div className="chat-user-evaluation-modal-content-user-profile">
                  <img src="../images/slide-banner2.png" alt="" />
                </div>
                <div className="chat-user-evaluation-modal-content-user-nickname">
                  <span>까치산불주먹</span>
                </div>
                <div className="chat-user-evaluation-modal-content-give-star">
                  <input type="button" value="별점주기" />
                </div>
              </div>
              <div className="chat-user-evaluation-modal-exit-btns">
                <input
                  className="chat-user-evaluation-btn chat-user-evaluation-quit-btn"
                  type="button"
                  value="안할래요"
                />
                <input
                  className="chat-user-evaluation-btn chat-user-evaluation-cancel-btn"
                  type="button"
                  value="취소"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 별점주기 모달 */}
        <div className="manner-score-modal">
          <div className="manner-score-modal-content">
            <i
              className="fa fa-close manner-modal-close"
              aria-hidden="true"
            ></i>
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
                <input
                  type="radio"
                  id="so-fun"
                  className="manner-check-box"
                  name="manner-radio"
                />
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
        <div className="chat-list-room-inner">
          <div className="chat-list-room-title">
            <i className="bi bi-chat-fill chat"></i>
            <h1>채팅방</h1>
            <i className="bi bi-plus-circle-fill plus"></i>
          </div>
          <div className="chat-list-room-place">
            {/* 채팅창 */}
            <ul className="chat-listes">
              <li className="chat-list-single">
                <div className="chat-sub">안녕하세요</div>
                <div className="chat-user-detail-informations">
                  <div className="chat-user-profile">
                    <img src="../images/user-profile-test.jpg" alt="프로필" />
                  </div>
                  <div className="chat-user-opponent">
                    <span>스피드왕조닦달</span>
                    <span>생존전문가김병철</span>
                    <span>최종보스최종진</span>
                    <span>프린시팔박시팔</span>
                    <span>까치산불주먹</span>
                    <span>망원동외로운주먹</span>
                  </div>
                  <div className="chat-list-icons">
                    <i className="bi bi-share-fill share">
                      <div className="share-box">공유하기</div>
                    </i>
                    <i className="bi bi-box-arrow-right chat-leave"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatListRoom;
