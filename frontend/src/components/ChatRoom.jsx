import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useNavigate, useParams } from "react-router-dom";
import { customHistory } from "../store/configureStore.js";
// import { actionCreators as chattingActions } from "../store/modules/chatting";
import { actionCreators as userActions } from "../store/modules/user";

const ChatRoomStyle = styled.div`
  text-align: left;
  font-size: 20px;
`;

const ChatRoomName = styled.span`
  display: inline-block;
`;

const ChatRoomEnter = styled.button`
  display: inline-block;
  width: 60px;
  cursor: pointer;
  font-size: 20px;
`;

function ChatRoom(props) {
  console.log("chatroom props:", props);

  const navigate = useNavigate();

  const goChatRoomClick = (roomId, e) => {
    navigate(`/chat/room/list/${roomId}`);
  };

  return (
    <>
      <li className="chat-list-single">
        <div className="chat-user-profile">
          <img src="../images/user-profile-test.jpg" alt="프로필" />
        </div>
        <div className="chat-user-opponent">
          {props.userData && props.userData.length > 0 ? (
            <div>
              {props.userData.map((user, index) => (
                <p key={index}>{user.nickname}</p>
              ))}
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </div>
        <div className="chat-sub">{props.roomName}</div>
        <div className="chat-head-count">10/10</div>
        <div className="chat-list-icons">
          <i className="bi bi-share-fill share">
            <div className="share-box">공유하기</div>
          </i>
          <i className="bi bi-box-arrow-right chat-leave"></i>
        </div>
      </li>
      {/* <ChatRoomStyle>
        <ChatRoomName>{props.roomName}({props.nickname})님꺼~</ChatRoomName>
        <ChatRoomEnter onClick={() => {
          goChatRoomClick(props.id);
        }}>
          입장
        </ChatRoomEnter>
      </ChatRoomStyle> */}
    </>
  );
}

export default ChatRoom;
