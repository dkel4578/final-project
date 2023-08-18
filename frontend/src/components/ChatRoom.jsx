import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom';
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
  console.log('chatroom props:', props);

  const navigate = useNavigate();

  const goChatRoomClick = (roomId, e) => {
    navigate(`/chat/room/list/${roomId}`);
  }

  return (
    <>
      <ChatRoomStyle>
        <ChatRoomName>{props.roomName}({props.roomMasterNickName})님꺼~</ChatRoomName>
        <ChatRoomEnter onClick={() => {
          goChatRoomClick(props.id);
        }}>
          입장
        </ChatRoomEnter>
      </ChatRoomStyle>
    </>
  )
}

export default ChatRoom;