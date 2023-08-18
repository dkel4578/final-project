import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom';
import { customHistory } from "../store/configureStore.js";
import { actionCreators as chattingActions } from "../store/modules/chatting";
import ChatRoom from "../components/ChatRoom";

const WrapChatRooms = styled.div`
  text-align: center;
  // display:flex;
  // flex-direction:row;
  // flex-wrap:wrap;
  // justify-content: center;
`;

const HHtalk = styled.button`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  width: 120px;
  height: 30px;
  // text-align: center;
  /* padding-top: 10px; */
  border: none;
  border-radius: 2px;
  outline: none;
  // background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

function ChatRoomListPage() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  // const userInfo = useSelector((state) => state.user.user);
  // console.log('ChatRoomListPage userInfo:', userInfo);
  const chatRoomList = useSelector((state) => state.chatting.chatRoomList);

  const goChatRoomCreate = (e) => {
    // navigate('/chat/room/list/0');
    const chatRoomName = prompt('채팅방 이름을 넣어주세요');
    
    // 채팅방 새로 생성
    if (chatRoomName) {
      dispatch(chattingActions.createChatRoomAPI({ chatRoomName: chatRoomName, uid: userInfo.uid }));
    }
  }

  React.useEffect(() => {
    dispatch(chattingActions.getChatRoomAPI());
  }, []);

  return (
    <>
      <WrapChatRooms>
        <HHtalk onClick={goChatRoomCreate}>채팅방 생성</HHtalk>
        <br/><br/>
        <div style={{ fontSize: "20px" }}>채팅방 리스트</div>
        <br/>
        {chatRoomList.map((p, idx) => {
          return <ChatRoom key={p.id} {...p} />
        })}
      </WrapChatRooms>
    </>
  );
}

export default ChatRoomListPage;